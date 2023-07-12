# JuroSpring Market
------------
### 왜 이런 프로젝트를 기획하였나요?
> **[ 대량의 데이터 ]** 를 가지고<br/>
> **[ 초기 데이터 적재부터 단순조회 및 활용까지 전 과정 ]** 을 다뤄보고자<br/>
> **[ 대중들에게 가장 익숙하고 의미있는 쇼핑데이터 ]** 를 이용한 프로젝트<br/>
------------
### 어떤 기술을 사용하였나요?
> **[ ES, Logstash, RDB ]**
> > 최소 몇 백만 건의 대규모 데이터를 가지고 실시간 검색 및 통계작업에 적합한 **[ ES 활용 ]**<br/> - 한국어 검색이 용이하도록 한국어형태소 분석기 Nori와 문자열을 잘라서 찾아내는 nGram 활용<br/> - 최소한의 검색연관도를 보장하기 위해 min_score : 20을 부여하여 질의<br/> - 메모리 부족으로 인한 성능저하 방지를 위해 최대 result 반환수를 800개로 한정<br/>
> > 데이터의 일관성 및 무결성 보장, 정형화된 관계파악에 용이한 장점을 가져가기 위해 **[ RDB 활용 ]**<br/>
> > 데이터베이스간의 동기화를 위해 **[ Logstash 활용 ]**<br/>
> > **[ 데이터 흐름 ]** RDB에 데이터 적재 => Logstash => ES에 데이터 적재<br/>
