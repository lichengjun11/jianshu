package jianshu.alcj.xin.util;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;








import javax.servlet.annotation.WebServlet;
import java.io.IOException;

/**
 * Created by lichengjun on 2017/6/28.
 */
@WebFilter(urlPatterns = "/*")
public class EncodingFilter implements Filter{
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        chain.doFilter(request,response);
    }

    @Override
    public void destroy() {

    }
}
