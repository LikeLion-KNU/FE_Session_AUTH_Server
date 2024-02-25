<h1 align="center">멋쟁이사자처럼 12기 프론트엔드 세션 <br/> Authentication & Authorization 실습 서버 </h1>

<div align="center">

![nest](https://img.shields.io/badge/Nest_JS-202020?style=for-the-badge&logo=nestjs&logoColor=E0234E)
![typeorm](https://img.shields.io/badge/TypeORM-202020?style=for-the-badge&logo=nestjs&logoColor=E0234E)
![sqlite](https://img.shields.io/badge/SQLite-202020?style=for-the-badge&logo=sqlite&logoColor=008ED2)
![jwt](https://img.shields.io/badge/JSON_WEB_TOKEN-202020?style=for-the-badge&logo=jsonwebtokens&logoColor=eeeeee)

</div>

# 주의 사항

본 서버는 멋쟁이 사자처럼 12기 프론트엔드 교육세션 (인증 및 인가)에 사용되는 실습서버로
<br/>
비밀번호는 암호화되어 저장되지 않습니다! 노출을 주의해주세요!

# 서버 실행

```bash
$ npm install
$ npm run start:dev
```

# API Documentation

## 1. 회원가입

### **Request**

URI : `/auth/signup`
<br>
METHOD : `POST`
<br>
Body :

```js
{
  "userId" : "example",
  "userPw" : "qwer1234!",
  "nickname" : "mynickname"
}
```

### **Response**

Status Code : 201 (성공)
<br>
ResponseBody

```js
{
    "token": "JWT.ACCESS.TOKEN"
}
```

## 2. 로그인

### **Request**

URI : `/auth/signin`
<br>
METHOD : `POST`
<br>
Body :

```js
{
  "userId" : "example",
  "userPw" : "qwer1234!"
}
```

### **Response**

Status Code : 201 (성공)
<br>
ResponseBody

```js
{
    "token": "JWT.ACCESS.TOKEN"
}
```

<br>
Status Code : 401 (실패)
<br>
Body :

```js
{
    "message": "잘못된 비밀번호입니다",
    "error": "Unauthorized",
    "statusCode": 401
}
```

<br>
Status Code : 404 (실패)
<br>
Body :

```js
{
    "message": "존재하지 않는 사용자입니다",
    "error": "Not Found",
    "statusCode": 404
}
```

## 3. 게시글 등록

### **Request**

URI : `/posts`
<br>
METHOD : `POST`
<br>
AUTHORIZATION : `Bearer {ACCESS_TOKEN}`
<br>
Body :

```js
{
    "title": "post title example",
    "content": "some post content"
}
```

### **Response**

Status Code : 201 (성공)
<br>
Body :

```js
{
    "postId" : 1,
}
```

## 4. 전체 게시글 조회

### **Request**

**URI : `/posts`**
<br>
**METHOD : `GET`**

### **Response**

Status Code : 200 (성공)
<br>
Body :

```js
[
    {
        id: 1,
        title: "this is title1",
        createdAt: "2024-02-25T19:12:24.000Z",
    },
    {
        id: 2,
        title: "this is title2",
        createdAt: "2024-02-25T19:13:46.000Z",
    },
    {
        id: 3,
        title: "this is title3",
        createdAt: "2024-02-25T19:38:19.000Z",
    },
    // ...
];
```

## 5. 게시글 상세 조회

### **Request**

URI : `/posts/:id`
<br>
PARAM : `postId`
<br>
METHOD : `GET`

### **Response**

Status Code : 200 (성공)
<br>
Body :

```js
{
    "id": 1,
    "title": "this is title1",
    "createdAt": "2024-02-25T19:12:24.000Z",
    "content": "this is content",
    "author": {
        "id": 1,
        "userId": "likelion",
        "nickname": "likelionknu"
    }
}
```

<br>
Status Code : 404 (실패)
<br>
Body :

```js
{
    "message": "존재하지 않는 게시글입니다",
    "error": "Not Found",
    "statusCode": 404
}
```
