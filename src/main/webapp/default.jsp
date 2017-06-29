<%--
  Created by IntelliJ IDEA.
  User: lichengjun
  Date: 2017/6/27
  Time: 11:27
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewpost" content="width=device-width,initial-scale=1">
    <title>简书 - 创作你的创作</title>
      <link rel='shortcut icon' type='image/x-icon' href='favicon.ico'>
      <link rel="stylesheet" href="static/css/bootstrap.min.css">
      <link rel="stylesheet" href="static/css/bootstrap-switch.css">
      <style>
          @import "static/css/nav.css";
      </style>
      <script src="static/js/jquery.js"></script>
      <script src="static/js/bootstrap.min.js"></script>
      <script src="static/js/bootstrap-switch.min.js"></script>
      <script src="static/js/nav.js"></script>
  </head>
  <body>
    <%@ include file="nav.jsp"%>
  <div class="container">
      <small class="text-danger">${requestScope.message}</small>
      <small class="text-danger">${param.message}</small>
  </div>
  </body>
</html>
