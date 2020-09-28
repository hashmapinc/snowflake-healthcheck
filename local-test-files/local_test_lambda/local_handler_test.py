import json
from snowflake import connector
import decimal

def input_error(err):
    error = str(err)
    if '002003' in error and 'Database' in error:
        return 'Snowflake database is not authorized or does not exist'
    elif '002003' in error and 'Schema' in error:
        return 'Snowflake schema is not authorized or does not exist'
    elif '002003' in error and 'Object' in error:
        return 'Snowflake table is not authorized or does not exist'
    elif '250001' in error:
        return 'Invalid Snowflake username, password, account, or role'
    elif '251006' in error:
        return 'Please enter a value for Snowflake password'
    elif '251005' in error:
        return 'Please enter a value for Snowflake username'
    elif '001003' in error and 'position 14' in error:
        return 'Please enter a value for Snowflake database'
    elif '002003' in error and 'PUBLIC' in error:
        return 'Please enter a value for Snowflake schema'
    elif '001003' in error and 'position 51' in error:
        return 'Please enter a value for Snowflake table'
    elif '251001' in error:
        return 'Please enter a value for Snowflake account'
    elif '002043' in error:
        return 'Snowflake warehouse is not authorized or does not exist'
    elif 'A required variable has not been added.' == error:
        return 'A required variable has not been added. Please fill out all required fields.'
    elif error.startswith('shape mismatch:'):
        return f'Congratulations, you found a bug! This bug is our top priority right now and has to do with how your table data is being read by our Python backend. We have had luck rerunning the profile request, so please give it another try. Otherwise, you can leave feedback above and we will reach out when we figure out how to fix this.\n\nError: {error}'
    else:
        return f"Lucky you! There's been an unknown error: {error}\n\nReach out to randy.pitcher@hashmapinc.com if you'd like to chat about this error or maybe you could try again (our profiling library is still maturing). Thanks!"

def get_snowflake_account_name(sfURL):
    """parses snowflake url if given a url"""

    # check if this is a url or already is an account name
    if '.snowflakecomputing.com' not in sfURL:
        return sfURL # assume that without the domain, this is already an account name

    # extract the http(s):// if it exists
    stripped_url = sfURL.split('://')[1] if '://' in sfURL else sfURL

    # pull out the account name now that we have the stripped url
    account_name = stripped_url.split('.snowflakecomputing.com')[0]

    return account_name


def get_snowflake_connection(sfUser, sfPswd, sfURL, sfRole=None):
    """establishes snowflake connection and returns connector object"""

    if not sfUser or not sfPswd or not sfURL:
        raise ValueError('A required variable has not been added.')

    sfAccount = get_snowflake_account_name(sfURL)
    
    con = connector.connect(
        user=sfUser,
        password=sfPswd,
        account=sfAccount,
        role=sfRole,
    )

    return con


def get_pandas_dataframe(con, sfRole=None, sfWarehouse=None):
    """creates cursor object and returns a pandas dataframe from the Snowflake table"""

    if not con:
        raise ValueError('A required variable has not been added.')

    cur = con.cursor()
    if sfWarehouse:
        cur.execute(f'use warehouse {sfWarehouse};')
    if sfRole:
        cur.execute(f'use role {sfRole};')

    df = cur.fetchall()

    return df


def get_profile(sfUser, sfPswd, sfURL, sfRole=None, sfWarehouse=None):
    """main function"""

    if not sfUser or not sfPswd or not sfURL:
        raise ValueError('A required variable has not been added.')

    conn = get_snowflake_connection(sfUser, sfPswd, sfURL, sfRole)
    return get_pandas_dataframe(conn, sfRole, sfWarehouse)

def myconverter(o):
    if isinstance(o, decimal.Decimal):
        return o.__str__()

def handler(event):
    resp = {}
    try:
        username  = event['username']
        password  = event['password']
        url       = event['url']
        role      = event['role']
        warehouse = event['warehouse']
        sql_data = get_profile(sfUser=username, sfPswd=password, sfURL=url, sfRole=role, sfWarehouse=warehouse)
        resp['status'] = 'ok'
        resp['body'] = sql_data
        return json.dumps(resp, default=myconverter)


    except Exception as e:
        print(e)
        resp['status'] = 'error'
        resp['error'] = input_error(e)
        return json.dumps(resp)


result = handler(jsondata)
print(result)