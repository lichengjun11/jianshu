package jianshu.alcj.xin.util;

import org.jasypt.util.password.StrongPasswordEncryptor;

/**
 * Created by lichengjun on 2017/6/30.
 */
public class Test {
    public static void main(String[] args) {
        StrongPasswordEncryptor encryptor = new StrongPasswordEncryptor();
        String password = encryptor.encryptPassword("123");

        System.out.println(password);

        System.out.println(encryptor.checkPassword("123",password));
    }
}
