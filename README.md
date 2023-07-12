# JuroSpring Market
------------
### 왜 이런 프로젝트를 기획하였나요?
> **[ 대량의 데이터 ]** 를 가지고<br/>
> **[ 초기 데이터 적재부터 단순조회 및 활용까지 전 과정 ]** 을 다뤄보고자<br/>
> **[ 대중들에게 가장 익숙하고 의미있는 쇼핑데이터 ]** 를 이용한 프로젝트<br/>
------------
### 어떤 기술을 사용하였나요?
> **[ 크롤링 및 API ]**
+ [ Selenium ]<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;브라우저를 통해 직접 해당 페이지로 접근하는 방식으로 가장 인간의 활동과 유사<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;AWS 프리티어 메모리로는 급격한 성능저하 발생으로 사용불가<br/>
+ [ Jsoup ]<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;적은 메모리로도 사용가능<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;이미지 로딩 불가 & 지속적인 호출 시 IP차단되거나 500번 503번 서버에러 발생 등으로 데이터 적재 로직의 안정성 저하 우려<br/>
+ **[ API ]**<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;적은 메모리로도 사용가능<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;이미지를 포함한 상품의 모든 상세정보를 가져올 수 있으면서 최소한의 서버부하로 해결가능 **=> PICK**<br/>
> **[ ES, Logstash, RDB ]**
+ 최소 몇 백만 건 이상의 대규모 데이터를 가지고 실시간 검색 및 통계작업에 적합한 **[ ES 활용 ]**<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;한국어 검색이 용이하도록 한국어형태소 분석기 Nori와 문자열을 잘라서 찾아내는 nGram 활용<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;최소한의 검색연관도를 보장하기 위해 min_score : 20을 부여하여 질의<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;메모리 부족으로 인한 성능저하 방지를 위해 최대 result 반환수를 800개로 한정<br/>
+ 데이터의 일관성 및 무결성 보장, 정형화된 관계파악에 용이한 장점을 가져가기 위해 **[ RDB 활용 ]**<br/>
+ 데이터베이스간의 동기화를 위해 **[ Logstash 활용 ]**<br/>
+ **[ 데이터 흐름 ]** RDB 데이터 적재 => Logstash => ES 데이터 적재<br/>
