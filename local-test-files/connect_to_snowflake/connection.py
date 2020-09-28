from snowflake import connector


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


def get_snowflake_connection(sfUser, sfPswd, sfURL, sfDatabase, sfSchema, sfTable, sfRole=None):
    """establishes snowflake connection and returns connector object"""

    if not sfUser or not sfPswd or not sfURL or not sfDatabase or not sfSchema or not sfTable:
        raise ValueError('A required variable has not been added.')

    sfAccount = get_snowflake_account_name(sfURL)
    
    con = connector.connect(
        user=sfUser,
        password=sfPswd,
        account=sfAccount,
        database=sfDatabase,
        schema=sfSchema,
        role=sfRole,
    )

    return con


def get_pandas_dataframe(con, sfDatabase, sfSchema, sfTable, sfWarehouse=None):
    """creates cursor object and returns a pandas dataframe from the Snowflake table"""

    if not con or not sfDatabase or not sfSchema or not sfTable:
        raise ValueError('A required variable has not been added.')

    cur = con.cursor()
    if sfWarehouse:
        cur.execute(f'use warehouse {sfWarehouse};')

    cur.execute(f'select * from {sfDatabase}.{sfSchema}.{sfTable} limit 10000;')
    df = cur.fetchall()

    return df


def get_profile(sfUser, sfPswd, sfURL, sfDatabase, sfSchema, sfTable, sfRole=None, sfWarehouse=None):
    """main function"""

    if not sfUser or not sfPswd or not sfURL or not sfDatabase or not sfSchema or not sfTable:
        raise ValueError('A required variable has not been added.')

    conn = get_snowflake_connection(sfUser, sfPswd, sfURL, sfDatabase, sfSchema, sfTable, sfRole)
    return get_pandas_dataframe(conn, sfDatabase, sfSchema, sfTable, sfWarehouse)
