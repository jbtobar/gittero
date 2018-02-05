CREATE FUNCTION check_account_update() RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('watchers', TG_TABLE_NAME || ',bid,' || NEW.bid );
  RETURN new;
END;
$$ LANGUAGE plpgsql;





CREATE TRIGGER check_update_af
    AFTER UPDATE ON bid_ask_last
    FOR EACH ROW
    WHEN (OLD.bid IS DISTINCT FROM NEW.bid)
    EXECUTE PROCEDURE check_account_update();






CREATE TABLE bal (id varchar primary key, bid float(15), ask float(15),last float(15));


CREATE FUNCTION notify_trigger_bal() RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('watchers', TG_TABLE_NAME || ',id,' || NEW.id||',' || NEW.bid||',' || NEW.ask||',' || NEW.last );
  RETURN new;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER watched_table_trigger_bal AFTER INSERT ON bal
FOR EACH ROW EXECUTE PROCEDURE notify_trigger_bal();

CREATE TRIGGER watched_table_trigger_bal_u AFTER UPDATE ON bal
FOR EACH ROW EXECUTE PROCEDURE notify_trigger_bal();


CREATE TABLE ri_options (id varchar primary key, bid float(15), ask float(15), last float(15), num_trades int, time_to_maturity int, option_base varchar, open_pos int, strike float(15), option_type varchar, volatility float(15), theor_price float(15) );




CREATE FUNCTION notify_option_feed() RETURNS trigger AS $$
DECLARE
BEGIN
	PERFORM pg_notify('watchers',TG_TABLE_NAME ||',id,' || NEW.id ||',' || NEW.bid ||',' || NEW.ask ||',' || NEW.last ||',' || NEW.num_trades ||',' || NEW.time_to_maturity ||',' || NEW.open_pos ||',' || NEW.volatility ||',' || NEW.theor_price);
	RETURN new;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER option_feed AFTER INSERT ON ri_options
FOR EACH ROW EXECUTE PROCEDURE notify_option_feed();

CREATE TRIGGER option_feed_u AFTER UPDATE ON ri_options
FOR EACH ROW EXECUTE PROCEDURE notify_option_feed();




 id               | character varying | not null
 bid              | real              | 
 ask              | real              | 
 last             | real              | 
 num_trades       | integer           | 
 time_to_maturity | integer           | 
 option_base      | character varying | 
 open_pos         | integer           | 
 strike           | real              | 
 option_type      | character varying | 
 volatility       | real              | 
 theor_price



CREATE TABLE ri_options_fixed (
	id varchar primary key,
	TRADINGSTATUS varchar(25),
	MAT_DATE timestamp,
	OPTIONBASE varchar(25),
	PREVSETTLEPRICE float(15),
	BUYDEPO float(15),
	CLPRICE float(15),
	BGOP float(15),
	BGONP float(15),
	STRIKE float(15),
	OPTIONTYPE varchar(25))







CREATE TABLE ri_snap_mirror (
index timestamp,
price float(15),
lband float(15),
uband float(15),
nearest float(15),
ttm_1 integer,
atm_spread_c_1 float(15),
atm_spread_p_1 float(15),
vol_u_1 float(15),
vol_d_1 float(15),
vol_1 float(15),
ttm_2 integer,
atm_spread_c_2 float(15),
atm_spread_p_2 float(15),
vol_u_2 float(15),
vol_d_2 float(15),
vol_2 float(15),
ttm_3 integer,
atm_spread_c_3 float(15),
atm_spread_p_3 float(15),
vol_u_3 float(15),
vol_d_3 float(15),
vol_3 float(15),
ttm_4 integer,
atm_spread_c_4 float(15),
atm_spread_p_4 float(15),
vol_u_4 float(15),
vol_d_4 float(15),
vol_4 float(15),
ttm_5 integer,
atm_spread_c_5 float(15),
atm_spread_p_5 float(15),
vol_u_5 float(15),
vol_d_5 float(15),
vol_5 float(15),
ttm_6 integer,
atm_spread_c_6 float(15),
atm_spread_p_6 float(15),
vol_u_6 float(15),
vol_d_6 float(15),
vol_6 float(15),
ttm_7 integer,
atm_spread_c_7 float(15),
atm_spread_p_7 float(15),
vol_u_7 float(15),
vol_d_7 float(15),
vol_7 float(15),
ttm_8 integer,
atm_spread_c_8 float(15),
atm_spread_p_8 float(15),
vol_u_8 float(15),
vol_d_8 float(15),
vol_8 float(15)
);

CREATE FUNCTION notify_snap_feed() RETURNS trigger AS $$
DECLARE
BEGIN
	PERFORM pg_notify(
		'watchers',
		TG_TABLE_NAME ||
		',id,' || 
		NEW.index || ',' || 
		NEW.price || ',' || 
		NEW.nearest ||',' || 
		NEW.ttm_1 ||',' || 
		NEW.atm_spread_c_1 ||',' || 
		NEW.atm_spread_p_1 ||',' || 
		NEW.vol_1 ||',' || 
		NEW.ttm_2 ||',' || 
		NEW.atm_spread_c_2 ||',' || 
		NEW.atm_spread_p_2 ||',' || 
		NEW.vol_2 ||',' || 
		NEW.ttm_3 ||',' || 
		NEW.atm_spread_c_3 ||',' || 
		NEW.atm_spread_p_3 ||',' || 
		NEW.vol_3 ||',' ||
		NEW.ttm_4 ||',' || 
		NEW.atm_spread_c_4 ||',' || 
		NEW.atm_spread_p_4 ||',' || 
		NEW.vol_4 
		);
	RETURN new;
END;
$$ LANGUAGE plpgsql;
 
CREATE TRIGGER snap_feed AFTER INSERT ON ri_snap_mirror
FOR EACH ROW EXECUTE PROCEDURE notify_snap_feed();

CREATE TRIGGER snap_feed_u AFTER UPDATE ON ri_snap_mirror
FOR EACH ROW EXECUTE PROCEDURE notify_snap_feed();


SELECT index,price,nearest,ttm_1,vol_1,vol_2,vol_3,vol_4,vol_5 FROM ri_snap_mirror ORDER BY index DESC LIMIT 10;



-- 
-- 
-- 
-- 
CREATE TABLE trade_accounts (
TRDACCID varchar primary key,
DAY timestamp,
FIRMID varchar,
LIMIT_TYPE varchar,
LIQUIDITY_COEFF float(15),
CBP_PREV_LIMIT float(15),
CBPLIMIT float(15),
CBPLUSED float(15),
CBPLUSED_FOR_ORDERS float(15),	
CBPLUSED_FOR_POSITIONS float(15),
CBPLPLANNED float(15),
VARMARGIN float(15),
ACCRUEDINT float(15),
OPTIONS_PREMIUM float(15),
TS_COMISSION float(15),
KGO float(15),
CURRCODE varchar,
REAL_VARMARGIN float(15)
);

INSERT into trade_accounts (TRDACCID,DAY,FIRMID,CBPLIMIT)
	VALUES ('BF103T',CURRENT_TIMESTAMP,'BF103',100000);

















CREATE TABLE order_log (
ORDERNUM integer not null,
EXCHANGE_CODE varchar(20),
ORDERTIME timestamp not null,
PERIOD varchar(20) not null,
SECNAME varchar(100) not null,
BUYSELL varchar(5) not null,
ACCOUNT varchar(20) not null,
PRICE float(15) not null,
QTY integer not null,
VISIBLE_QTY integer,
BALANCE integer not null,
VALUE float(15) not null,
BROKERREF varchar(150),
STATUS varchar(20) not null
)







CREATE TABLE baltic (
	id varchar primary key, 
	bid float(15), 
	ask float(15),
	last float(15),
	change float(15),
	valtoday float(15),
	)


CREATE FUNCTION notify_trigger_baltic() RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('watchers', TG_TABLE_NAME || ',id,' || NEW.id||',' || NEW.bid||',' || NEW.ask||',' || NEW.last ||',' || NEW.change||',' || NEW.valtoday );
  RETURN new;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER baltic_trigger AFTER INSERT ON baltic
FOR EACH ROW EXECUTE PROCEDURE notify_trigger_baltic();

CREATE TRIGGER baltic_trigger_u AFTER UPDATE ON baltic
FOR EACH ROW EXECUTE PROCEDURE notify_trigger_baltic();




CREATE TABLE heatmapper (
	ID varchar primary key,
	BIDDEPTHT integer,
	NUMBIDS integer,
	OFFERDEPTHT integer,
	NUMOFFERS integer,
	VOLTODAY integer,
	VALTODAY float(15),
	NUMTRADES integer,
	DAYS_TO_MAT_DATE integer,
	OPTIONBASE varchar,
	NUMCONTRACTS integer,
	STRIKE float(15),
	OPTIONTYPE varchar(5),
	VOLATILITY float(15),
	);




	LOTSIZE	PREVPRICE	LONGNAME	SHORTNAME	CODE	CLASSNAME	CLASS_CODE	TRADE_DATE_CODE	SEC_FACE_UNIT	SEC_SCALE	SEC_PRICE_STEP	SEC_COMMENT	SECTYPE	STATUS	BID	BIDDEPTH	BIDDEPTHT	NUMBIDS	OFFER	OFFERDEPTH	OFFERDEPTHT	NUMOFFERS	HIGH	LOW	LAST	CHANGE	QTY	TIME	VOLTODAY	VALTODAY	TRADINGSTATUS	VALUE	WAPRICE	NUMTRADES	PREVWAPRICE	LASTCHANGE	ANONTRADE	MAT_DATE	DAYS_TO_MAT_DATE	STARTTIME	ENDTIME	CHANGETIME	PRICEMAX	PRICEMIN	OPTIONBASE	TRADECHANGE	PREVSETTLEPRICE	NUMCONTRACTS	BUYDEPO	STEPPRICET	STEPPRICE	CLSTATE	CLPRICE	EVNSTARTTIME	EVNENDTIME	MONSTARTTIME	MONENDTIME	CURSTEPPRICE	EXPDATE	EXCH_PAY	FIRSTOPEN	LASTCLOSE	PREVSETTLEVOL	OPTIONBASECLASS	BGOP	BGONP	STRIKE	OPTIONTYPE	VOLATILITY	THEORPRICE	MARG	OPTIONKIND
Si53500BW7E	1	2	Si-12.17M301117PA53500	Si53500BW7E	Si53500BW7E	FORTS (options)	SPBOPT	11/21/2017	SUR	0	1		Options	suspended	0	0	0	0	0	0	0	0	1	1	1	0	1	10:17:34 AM	1	53500	opened	1	1	1	2	0	Allowed	11/30/2017	9	10:00:00 AM	6:45:00 PM	6:51:59 PM	25	1	SiZ7	0	2	2	2	1	1	ICL done	2	7:00:00 PM	11:50:00 PM	7:00:00 AM	8:40:00 AM	SUR	11/30/2017		1	0	2	SPBFUT	3609.11	1114.77	53500	Put	18.233	1	Margin	American





CREATE TABLE opsall (
CODE	varchar(50) primary key,
LOTSIZE	float(15),
PREVPRICE	float(15),
LONGNAME	varchar(50),
SHORTNAME	varchar(50),
CLASSNAME	varchar(50),
CLASS_CODE	varchar(20),
TRADE_DATE_CODE	date,
SEC_FACE_UNIT	varchar(20),
SEC_SCALE	float(15),
SEC_PRICE_STEP	float(15),
SEC_COMMENT	varchar(20),
SECTYPE	varchar(20),
STATUS	varchar(20),
BID	float(15),
BIDDEPTH	float(15),
BIDDEPTHT	float(15),
NUMBIDS	float(15),
OFFER	float(15),
OFFERDEPTH	float(15),
OFFERDEPTHT	float(15),
NUMOFFERS	float(15),
HIGH	float(15),
LOW	float(15),
LAST	float(15),
CHANGE	float(15),
QTY	float(15),
TIME	time,
VOLTODAY	float(15),
VALTODAY	float(15),
TRADINGSTATUS	varchar(20),
VALUE	float(15),
WAPRICE	float(15),
NUMTRADES	float(15),
PREVWAPRICE	float(15),
LASTCHANGE	float(15),
ANONTRADE	varchar(20),
MAT_DATE	date,
DAYS_TO_MAT_DATE	int,
STARTTIME	time,
ENDTIME	time,
CHANGETIME	time,
PRICEMAX	float(15),
PRICEMIN	float(15),
OPTIONBASE	varchar(20),
TRADECHANGE	float(15),
PREVSETTLEPRICE	float(15),
NUMCONTRACTS	float(15),
BUYDEPO	float(15),
STEPPRICET	float(15),
STEPPRICE	float(15),
CLSTATE	varchar(20),
CLPRICE	float(15),
EVNSTARTTIME	time,
EVNENDTIME	time,
MONSTARTTIME	time,
MONENDTIME	time,
CURSTEPPRICE	varchar(10),
EXPDATE	date,
EXCH_PAY	float(15),
FIRSTOPEN	float(15),
LASTCLOSE	float(15),
PREVSETTLEVOL	float(15),
OPTIONBASECLASS	varchar(10),
BGOP	float(15),
BGONP	float(15),
STRIKE	float(15),
OPTIONTYPE	varchar(10),
VOLATILITY	float(15),
THEORPRICE	float(15),
MARG	varchar(20),
OPTIONKIND	varchar(20),
);


CREATE TABLE opsall (
CODE 	varchar(50) primary key,
LOTSIZE 	float(15),
PREVPRICE 	float(15),
LONGNAME 	varchar(50),
SHORTNAME 	varchar(50),
CLASSNAME 	varchar(50),
CLASS_CODE 	varchar(20),
TRADE_DATE_CODE 	date,
SEC_FACE_UNIT 	varchar(20),
SEC_SCALE 	float(15),
SEC_PRICE_STEP 	float(15),
SEC_COMMENT 	varchar(20),
SECTYPE 	varchar(20),
STATUS 	varchar(20),
BID 	float(15),
BIDDEPTH 	float(15),
BIDDEPTHT 	float(15),
NUMBIDS 	float(15),
OFFER 	float(15),
OFFERDEPTH 	float(15),
OFFERDEPTHT 	float(15),
NUMOFFERS 	float(15),
HIGH 	float(15),
LOW 	float(15),
LAST 	float(15),
CHANGE 	float(15),
QTY 	float(15),
TIME 	time,
VOLTODAY 	float(15),
VALTODAY 	float(15),
TRADINGSTATUS 	varchar(20),
VALUE 	float(15),
WAPRICE 	float(15),
NUMTRADES 	float(15),
PREVWAPRICE 	float(15),
LASTCHANGE 	float(15),
ANONTRADE 	varchar(20),
MAT_DATE 	date,
DAYS_TO_MAT_DATE 	int,
STARTTIME 	time,
ENDTIME 	time,
CHANGETIME 	time,
PRICEMAX 	float(15),
PRICEMIN 	float(15),
OPTIONBASE 	varchar(20),
TRADECHANGE 	float(15),
PREVSETTLEPRICE 	float(15),
NUMCONTRACTS 	float(15),
BUYDEPO 	float(15),
STEPPRICET 	float(15),
STEPPRICE 	float(15),
CLSTATE 	varchar(20),
CLPRICE 	float(15),
EVNSTARTTIME 	time,
EVNENDTIME 	time,
MONSTARTTIME 	time,
MONENDTIME 	time,
CURSTEPPRICE 	varchar(10),
EXPDATE 	date,
EXCH_PAY 	float(15),
FIRSTOPEN 	float(15),
LASTCLOSE 	float(15),
PREVSETTLEVOL 	float(15),
OPTIONBASECLASS 	varchar(10),
BGOP 	float(15),
BGONP 	float(15),
STRIKE 	float(15),
OPTIONTYPE 	varchar(10),
VOLATILITY 	float(15),
THEORPRICE 	float(15),
MARG 	varchar(20),
OPTIONKIND 	varchar(20)
);









