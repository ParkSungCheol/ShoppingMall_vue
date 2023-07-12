# JuroSpring Market
------------
### 왜 이런 프로젝트를 기획하였나요?
> **[ 대량의 데이터 ]** 를 가지고<br/>
> **[ 초기 데이터 적재부터 단순조회 및 활용까지 전 과정 ]** 을 다뤄보고자<br/>
> **[ 대중들에게 가장 익숙하고 의미있는 쇼핑데이터 ]** 를 이용한 프로젝트<br/>
------------
### 어떤 기술을 사용하였나요?
> **[ 크롤링 및 API ]**
+ [ Selenium ] 
+ + 브라우저를 통해 직접 해당 페이지로 접근하는 방식으로 가장 인간의 활동과 유사<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;AWS 프리티어 메모리로는 급격한 성능저하 발생으로 **사용불가** <br/>
+ [ Jsoup ] <br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;적은 메모리로도 사용가능<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;이미지 로딩 불가 & 지속적인 호출 시 IP차단되거나 500번 503번 서버에러 발생 등으로 데이터 적재 로직의 **안정성 저하 우려** <br/>
+ **[ API ]** <br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;적은 메모리로도 사용가능<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;이미지를 포함한 상품의 모든 상세정보를 가져올 수 있으면서 최소한의 서버부하로 해결가능 **=> PICK** <br/>
> **[ 스프링 배치 ]**
+ **[ Chunk ]** <br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;Tasklet 방식은 tasklet 전체가 트랜잭션으로 다뤄져서 완료되지 않는 이상 DB에 적재하지 않음<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;Chunk방식은 유연한 트랜잭션 관리를 제공해서 chunk 1단위씩 끊어서 트랜잭션을 구성하여 언제라도 interrupt가 발생하면 이전 chunk까지의 진행상황은 DB에 적재<br/>
+ **[ 멀티쓰레드 ]** <br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;API방식을 채택하여 메모리가 부족하지 않은 환경에서 멀티쓰레드를 적용하여 대량의 데이터를 단시간내에 적재<br/>
+ **[ 재시도 및 알림 ]** <br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;API 호출 시 제대로 된 데이터를 받지 못했을 경우 3번까지 재시도 => chunk단위가 실패하면 Decider를 설정하여 3번까지 해당 chunk를 재시도 => 모두 실패 시 Slack으로 알림을 띄우도록 설계하여 안정성 보장<br/>
+ **[ DB Connection ]** <br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;DB Connection open시 list형태로 트랙킹하고 배치종료 전 DB Connection 모두 close하도록 설계<br/>
> **[ ES, Logstash, RDB ]**
+ **[ ES ]** <br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;최소 몇 백만 건 이상의 대규모 데이터를 가지고 실시간 검색 및 통계작업에 적합<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;한국어 검색이 용이하도록 한국어형태소 분석기 Nori와 문자열을 잘라서 찾아내는 nGram 활용<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;최소한의 검색연관도를 보장하기 위해 min_score : 20을 부여하여 질의<br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;메모리 부족으로 인한 성능저하 방지를 위해 최대 result 반환수를 800개로 한정<br/>
+ **[ RDB ]** <br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;데이터의 일관성 및 무결성 보장, 정형화된 관계파악에 적합<br/>
+ **[ Logstash ]** <br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;RDB와 ES간의 동기화<br/>
+ **[ 데이터 흐름 ]** <br/>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;RDB 데이터 적재 => Logstash => ES 데이터 적재<br/>
