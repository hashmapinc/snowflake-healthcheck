-- Set execution context
-- Also select the warehouse you want to use for this. An X-SMALL is just fine for most people.
USE ROLE RTE;
USE WAREHOUSE RTE_WH;
USE DATABASE SNOWFLAKE;
USE SCHEMA ACCOUNT_USAGE; 

-- Set session variables, if any.
SET HISTORY_DURATION_DAYS=30;


WITH

WAREHOUSE_HEALTH AS (
  SELECT
  TOP 10
    WAREHOUSE_ID || ' - ' || WAREHOUSE_NAME || ' - ' || WAREHOUSE_SIZE AS WAREHOUSE,
    MEDIAN(EXECUTION_TIME)/1000/60                                     AS MEDIAN_EXECUTION_TIME_MINUTES,
    MEDIAN(QUEUED_PROVISIONING_TIME)/1000/60                           AS MEDIAN_QUEUED_PROVISIONING_TIME_MINUTES,
    MEDIAN(QUEUED_OVERLOAD_TIME)/1000/60                               AS MEDIAN_QUEUED_OVERLOAD_TIME_MINUTES
  FROM QUERY_HISTORY
  WHERE WAREHOUSE IS NOT NULL 
    AND END_TIME > DATEADD(DAY, -1*$HISTORY_DURATION_DAYS, CURRENT_TIMESTAMP )
  GROUP BY WAREHOUSE
),

WAREHOUSE_HEALTH_JSON AS (
  SELECT 
    OBJECT_INSERT(
      OBJECT_CONSTRUCT('type','warehouse_health'),
      'data', OBJECT_CONSTRUCT(
        'MEDIAN_EXECUTION_TIME_MINUTES', MEDIAN_EXECUTION_TIME_MINUTES,
        'MEDIAN_QUEUED_PROVISIONING_TIME_MINUTES', MEDIAN_QUEUED_PROVISIONING_TIME_MINUTES,
        'MEDIAN_QUEUED_OVERLOAD_TIME_MINUTES', MEDIAN_QUEUED_OVERLOAD_TIME_MINUTES,
        'WAREHOUSE', CONCAT_WS('_', 'WH', RANDSTR(3, RANDOM()))
      )
    ) AS HEALTHCHECK_V1
  FROM WAREHOUSE_HEALTH
),

WAREHOUSE_USAGE AS (
  SELECT 
  TOP 10
    SUM(CREDITS_USED_COMPUTE)               AS COMPUTE_CREDITS,
    START_TIME::DATE                        AS DATE,
    WAREHOUSE_ID || ' - ' || WAREHOUSE_NAME AS WAREHOUSE 
  FROM WAREHOUSE_METERING_HISTORY
  WHERE
    DATE > DATEADD(DAY, -1*$HISTORY_DURATION_DAYS, CURRENT_TIMESTAMP )
  GROUP BY WAREHOUSE, DATE
),

WAREHOUSE_USAGE_JSON AS (
  SELECT 
    OBJECT_INSERT(
      OBJECT_CONSTRUCT('type','warehouse_usage'),
      'data', OBJECT_CONSTRUCT(
        'COMPUTE_CREDITS', COMPUTE_CREDITS,
        'DATE', DATE,
        'WAREHOUSE', CONCAT_WS('_', 'WH', RANDSTR(3, RANDOM()))
      )
    ) AS HEALTHCHECK_V1
  FROM WAREHOUSE_USAGE
),

DATABASE_USAGE AS (
  SELECT 
  TOP 10
    AVERAGE_DATABASE_BYTES/1024/1024/1024 AS AVERAGE_DAILY_USAGE_GIGABYTES,
    USAGE_DATE::DATE                      AS DATE,
    DATABASE_ID || ' - ' || DATABASE_NAME AS DATABASE 
  FROM DATABASE_STORAGE_USAGE_HISTORY
  WHERE
    DATE > DATEADD(DAY, -1*$HISTORY_DURATION_DAYS, CURRENT_TIMESTAMP )
    AND DELETED IS NULL
),

DATABASE_USAGE_JSON AS (
  SELECT 
    OBJECT_INSERT(
      OBJECT_CONSTRUCT('type','database_usage'),
      'data', OBJECT_CONSTRUCT(
        'AVERAGE_DAILY_USAGE_GIGABYTES', AVERAGE_DAILY_USAGE_GIGABYTES,
        'DATE', DATE,
        'DATABASE', CONCAT_WS('_', 'DB', RANDSTR(3, RANDOM()))
      )
    ) AS HEALTHCHECK_V1

  FROM DATABASE_USAGE
),

TABLE_ACTIVE_STORAGE AS (
  SELECT
  TOP 10
    TABLE_SCHEMA || ' - ' || TABLE_NAME AS TABLE_NAME,
    TABLE_CATALOG                       AS DATABASE_NAME,
    ACTIVE_BYTES/1024/1024/1024         AS ACTIVE_STORAGE_GIGABYTES
  FROM TABLE_STORAGE_METRICS
  WHERE
      ACTIVE_STORAGE_GIGABYTES != 0 
      AND DELETED = FALSE
  ORDER BY
      ACTIVE_STORAGE_GIGABYTES DESC
),

TABLE_ACTIVE_STORAGE_JSON AS (
  SELECT
    OBJECT_INSERT(
      OBJECT_CONSTRUCT('type','table_active_storage'),
      'data', OBJECT_CONSTRUCT(
        'TABLE_NAME', CONCAT_WS('-', CONCAT_WS('_', 'SCHM', RANDSTR(3, RANDOM())), CONCAT_WS('_', 'OBJ', RANDSTR(3, RANDOM())) ),
        'DATABASE_NAME', CONCAT_WS('_', 'DB', RANDSTR(3, RANDOM())),
        'ACTIVE_STORAGE_GIGABYTES', ACTIVE_STORAGE_GIGABYTES
      )
    ) AS HEALTHCHECK_V1
  
  FROM TABLE_ACTIVE_STORAGE
)

,ACESS_HISTORY_FOR_DURATION_ONLY AS (
    SELECT 
    *
    FROM ACCESS_HISTORY
    WHERE QUERY_START_TIME >= DATEADD('DAY', -1*$HISTORY_DURATION_DAYS, CURRENT_TIMESTAMP())
  )
  
  ,DIRECT_ACCESS_OBJECTS AS (
      SELECT
      FLATTENED_DAO.VALUE:objectName AS OBJECT_NAME
      ,FLATTENED_DAO.VALUE:objectDomain AS OBJECT_TYPE
      ,COUNT(DISTINCT QUERY_ID) AS DISTINCT_QUERIES_FIRED
      FROM ACESS_HISTORY_FOR_DURATION_ONLY, LATERAL FLATTEN(DIRECT_OBJECTS_ACCESSED) FLATTENED_DAO
      GROUP BY 1, 2
  )
  
  ,TOP10_MOST_USED_DAO AS (
    SELECT 
    TOP 10 
    OBJECT_INSERT(
      OBJECT_CONSTRUCT('type', 'most_accessed_objects'),
      'data', OBJECT_CONSTRUCT(
          'OBJECT_NAME', CONCAT_WS('.',CONCAT_WS('_', 'DB', RANDSTR(3, RANDOM())), CONCAT_WS('_', 'SCHM', RANDSTR(3, RANDOM())), CONCAT_WS('_', 'OBJ', RANDSTR(3, RANDOM())) ),
          'OBJECT_TYPE', object_type,
          'DISTINCT_QUERIES_FIRED', distinct_queries_fired
      )
    ) AS HEALTHCHECK_V1
    FROM DIRECT_ACCESS_OBJECTS
    ORDER BY DISTINCT_QUERIES_FIRED DESC
  )
  
  ,BOTTOM10_LEAST_USED_DAO AS (
    SELECT
    TOP 10
    OBJECT_INSERT(
      OBJECT_CONSTRUCT('type', 'least_accessed_objects'),
      'data', OBJECT_CONSTRUCT(
          'OBJECT_NAME', CONCAT_WS('.',CONCAT_WS('_', 'DB', RANDSTR(3, RANDOM())), CONCAT_WS('_', 'SCHM', RANDSTR(3, RANDOM())), CONCAT_WS('_', 'OBJ', RANDSTR(3, RANDOM())) ),
          'OBJECT_TYPE', object_type,
          'DISTINCT_QUERIES_FIRED', distinct_queries_fired
      )
    ) AS HEALTHCHECK_V1
    FROM DIRECT_ACCESS_OBJECTS
    ORDER BY DISTINCT_QUERIES_FIRED ASC
  )
  
  ,POWER_USERS AS (
    SELECT
    TOP 10
    USER_NAME
    ,COUNT(DISTINCT QUERY_ID) AS DISTINCT_QUERIES_FIRED
    FROM ACESS_HISTORY_FOR_DURATION_ONLY
    GROUP BY 1
    ORDER BY 2 DESC
  )

SELECT HEALTHCHECK_V1 FROM WAREHOUSE_HEALTH_JSON
UNION ALL
SELECT HEALTHCHECK_V1 FROM WAREHOUSE_USAGE_JSON
UNION ALL
SELECT HEALTHCHECK_V1 FROM DATABASE_USAGE_JSON
UNION ALL
SELECT HEALTHCHECK_V1 FROM TABLE_ACTIVE_STORAGE_JSON
UNION ALL
SELECT HEALTHCHECK_V1 FROM TOP10_MOST_USED_DAO
UNION ALL
SELECT HEALTHCHECK_V1 FROM BOTTOM10_LEAST_USED_DAO
UNION ALL
SELECT 
  OBJECT_INSERT( 
    OBJECT_CONSTRUCT('type', 'power_users'),
    'data', OBJECT_CONSTRUCT(
        --'REAL_USER_NAME', user_name,
       'USER_NAME', CONCAT_WS('_', 'USER', RANDSTR(5, random())),
       'DISTINCT_QUERIES_FIRED', DISTINCT_QUERIES_FIRED
    )
  ) AS HEALTHCHECK_V1 
FROM POWER_USERS;
   