package jianshu.alcj.xin.servlet;

import java.security.Key;
import java.util.Collection;
import java.util.Hashtable;
import java.util.Map;
import java.util.Scanner;

/**
 * Created by lichengjun on 2017/7/7.
 */
public class Test {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入一串小写字母：");
        String s = scanner.nextLine();
        scanner.close();
        Hashtable<Character,Integer> hashtable = new Hashtable<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            Integer value = hashtable.get(c);

        if (value == null){
            hashtable.put(c,1);
        }
        else {
            hashtable.put(c,value+1);
        }
        }
//        for (Character character : hashtable.keySet()) {
//            System.out.println(character+"="+hashtable.get(character));
//        }
        for (Map.Entry<Character, Integer> entry : hashtable.entrySet()) {
            System.out.println(entry.getKey()+"="+entry.getValue());
        }
    }
}
