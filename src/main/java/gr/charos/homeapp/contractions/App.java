package gr.charos.homeapp.contractions;

import java.net.UnknownHostException;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.SimpleCommandLinePropertySource;


@SpringBootApplication
public class App implements CommandLineRunner {
	

	public static void main(String[] args) throws UnknownHostException {
		SpringApplication.run(App.class, args);
		
	}

	
	public void run(String... args) throws Exception {
		
		SimpleCommandLinePropertySource source = new SimpleCommandLinePropertySource(args);

	}
}
