<h1>☕️ 카페 KIOSK</h1>
<div>2주간 진행된 카페 키오스크 서비스 개인 프로젝트입니다.</div>
<div>개인 프로젝트이지만 4명의 조원과 함께 협업을 하며 진행했습니다.</div>

### 🗂 [3조 기록용 노션](https://olive-iguanadon-df1.notion.site/3-6757a9f1147240b099f19aa89cdf4b58)

### 💻 [데모](http://15.165.209.251/)

### 📖 [WIKI](https://github.com/woowa-techcamp-2022/web-kiosk-shinhyeonjeong/wiki)

# 🛠 Tech Stack

### Client

<!-- js -->
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<!-- js -->
<img src="https://img.shields.io/badge/react-4D4D4D?style=for-the-badge&logo=react&logoColor=#61DAFB">
<!-- scss -->
<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">

### Server

<!-- express -->
<img src="https://img.shields.io/badge/nestJs-E0234E?style=for-the-badge&logo=nestJs&logoColor=#E0234E">
<!-- mysql -->
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<!-- aws -->
<img src="https://img.shields.io/badge/aws EC2-FF7200?style=for-the-badge&logo=amazonaws&logoColor=black">

# ✨ Getting Started

### 1. Clone the repo

```
git clone https://github.com/woowa-techcamp-2022/web-kiosk-shinhyeonjeong
```

### 2. Install Package

모노레포로 관리되기 때문에 root에서 패키지 설치를 진행하면 공통 패키지 포함 client, server 패키지가 설치됩니다.

```
yarn install
```

### 3. .env 생성 및 환경변수 설정

1. env 파일을 생성

```
touch .env
```

2. DB, API 서버 관련 설정

```
PORT = /* API 서버 사용 포트 */
DB_HOST = /* 연결할 DB의 HOST */
DB_PORT = /* API 서버 사용 포트 */
DB_USER = /* DB에 접근이 허용된 사용자 ID */
DB_PASSWORD =  /* DB에 접근이 허용된 사용자 PW */
DB_DATABASE =  /* Database명 */
```

### 4. Build client and start server

#### 1. build client

```
yarn client build
```

#### 2. build and start server

```
yarn server build
yarn server start:prod
```

# 🥳 기능

### 카테고리 슬라이드

![슬라이드](https://user-images.githubusercontent.com/55647436/184503165-13f53179-4c6d-4bf0-b1ae-d5a90c7ec86a.gif)

### 상품추가

![상품추가](https://user-images.githubusercontent.com/55647436/184503162-f209545a-b5bd-4104-b749-bf533056b62b.gif)

### 남은시간

- 장바구니에 변경이 발생한 시점부터 남은시간을 카운트 하는 기능입니다.
- 0초 도달 시, 장바구니 초기화 후 타이머도 초기화됩니다.

![타이머 리셋](https://user-images.githubusercontent.com/55647436/184503166-af5a3e31-7f99-449c-b958-5aa9eb7350a7.gif)

### 카드 결제

![결제](https://user-images.githubusercontent.com/55647436/184503160-42add7bf-d330-4b1c-83e2-ab366a3e89bd.gif)
