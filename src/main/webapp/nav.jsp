<%--
  Created by IntelliJ IDEA.
  User: lichengjun
  Date: 2017/6/27
  Time: 11:27
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button class="navbar-toggle" data-toggle="collapse" data-target="#nav">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">简书</a>
        </div>
        <div id="nav" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li id="index" class="active"><a href="/">首页</a></li>
                <li><a href="">下载 APP</a></li>
            </ul>

            <form class="navbar-form navbar-left" action="" method="post">
                <div class="input-group">
                    <input class="form-control" type="text" name="keywords" placeholder="搜索">
                <div class="input-group-btn">
                    <button class="btn btn-default">
                        <i class="glyphicon glyphicon-search"></i>
                    </button>
                </div>
                </div>
            </form>

            <ul class="nav navbar-nav navbar-right">
                <li><a href="">Aa</a></li>
                <li><a href="">登录</a></li>
                <li>
                    <button id="sign-up" class="btn btn-default navbar-btn" >注册</button>
                </li>
                <li>
                    <button id="write-note" class="btn btn-danger navbar-btn"><i class="glyphicon glyphicon-pencil"></i>
                        写文章</button>
                </li>

            </ul>
        </div>
    </div>
</nav>