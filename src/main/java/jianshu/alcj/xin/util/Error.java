package jianshu.alcj.xin.util;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by lichengjun on 2017/6/28.
 */
public class Error {
    public static void showError(HttpServletRequest request, HttpServletResponse response){
        request.setAttribute("message","Error.");
        try {
            request.getRequestDispatcher("default.jsp").forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
