package jianshu.alcj.xin.servlet;

import com.alibaba.fastjson.JSON;
import jianshu.alcj.xin.model.User;
import jianshu.alcj.xin.util.Db;
import jianshu.alcj.xin.util.Error;
import org.jasypt.util.password.StrongPasswordEncryptor;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by lichengjun on 2017/6/28.
 */
@WebServlet(urlPatterns = "/user")
public class UserAction extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = req.getParameter("action");

        if ("signUp".equals(action)) {
            signUp(req,resp);
            return;
        }
        if ("isNickExisted".equals(action)) {
            isNickExisted(req,resp);
            return;
        }
        if ("signIn".equals(action)) {
            signIn(req,resp);
            return;
        }
        Error.showError(req,resp);
    }

        private void signUp(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String nick = req.getParameter("nick").trim();
        String mobile = req.getParameter("mobile").trim();
        // TODO: 2017/6/29

            // 先做昵称验证
            if (isNickExisted(req,resp)){
                req.setAttribute("message","昵称已经被使用");
                req.getRequestDispatcher("sign_up.jsp").forward(req,resp);
                return;
            }

        StrongPasswordEncryptor encryptor = new StrongPasswordEncryptor();
        String password = encryptor.encryptPassword(req.getParameter("password"));
        Connection connection = Db.getConnection();
        PreparedStatement preparedStatement = null;

        String sql = "INSERT INTO db_jianshu.user(nick,mobile,password,lastIp) VALUE (?,?,?,?)";
        try {
            if (connection != null) {
                preparedStatement = connection.prepareStatement(sql);
            }else {
                Error.showError(req,resp);
                return;
            }
            preparedStatement.setString(1,nick);
            preparedStatement.setString(2,mobile);
            preparedStatement.setString(3,password);
            preparedStatement.setString(4,req.getRemoteAddr());

            preparedStatement.executeUpdate();
            resp.sendRedirect("default.jsp");
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            Db.close(null,preparedStatement,connection);
        }
    }

    private boolean isNickExisted(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String nick = req.getParameter("nick").trim();
        boolean isNickExisted = false;
        Connection connection = Db.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        String sql = "SELECT * FROM db_jianshu.user WHERE nick = ?";
        try {
            if (connection != null) {
                preparedStatement = connection.prepareStatement(sql);
            }else {
                Error.showError(req,resp);
            }
            preparedStatement.setString(1,nick);
            resultSet = preparedStatement.executeQuery();
            isNickExisted = resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            Db.close(resultSet,preparedStatement,connection);
        }
        resp.setContentType("application/json");
        Writer writer = resp.getWriter();
        Map<String ,Object> map = new HashMap<>();
        map.put("isNickExisted",isNickExisted);
        String json = JSON.toJSONString(map);
        writer.write(json);
        return true;
    }

        private void signIn(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String mobile = req.getParameter("mobile").trim();
        String plainPassword = req.getParameter("password");

        Connection connection = Db.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        String sql = "SELECT * FROM db_jianshu.user WHERE mobile = ?";

        try {
            if (connection != null) {
                preparedStatement = connection.prepareStatement(sql);
            } else {
                Error.showError(req, resp);
                return;
            }
            preparedStatement.setString(1, mobile);

            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                StrongPasswordEncryptor encryptor = new StrongPasswordEncryptor();
                String encryptedPassword = encryptor.encryptPassword(plainPassword);

                if (encryptor.checkPassword(plainPassword, encryptedPassword)) {
                    System.out.println(encryptor.checkPassword(plainPassword,encryptedPassword));
                    System.out.println("if3");
                    User user = new User(
                            resultSet.getInt("id"),
                            resultSet.getString("nick"),
                            resultSet.getString("mobile"),
                            resultSet.getString("password"),
                            resultSet.getString("avatar"),
                            resultSet.getInt("pay"),
                            resultSet.getDouble("money"),
                            resultSet.getString("lastIp"),
                            resultSet.getString("lastTime"),
                            resultSet.getString("signUpTime")
                    );
                    sql = "UPDATE db_jianshu.user SET lastIp = ?, lastTime = now() WHERE id = ?";
                    preparedStatement = connection.prepareStatement(sql);
                    preparedStatement.setString(1, req.getRemoteAddr());
                    preparedStatement.setInt(2, user.getId());
                    preparedStatement.executeUpdate();
                    System.out.println("if4");
                    req.getSession().setAttribute("user", user.getNick());
                    resp.sendRedirect("default.jsp");
                }
            }
            else  {
                System.out.println("if5");
            req.setAttribute("message", "登录失败，手机号/邮箱或密码错误");
            req.getRequestDispatcher("sign_in.jsp").forward(req,resp);
                }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            Db.close(resultSet, preparedStatement, connection);
        }


    }


        @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
    }
}
