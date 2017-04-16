package gr.charos.homeapp.contractions.model;

import java.util.ArrayList;
import java.util.List;

public class Pregnant {
	private String id;
	
	private String name;
	private List<Contraction> contractions;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Contraction> getContractions() {
		if (contractions==null) {
			contractions = new ArrayList<Contraction>();
		}
		return contractions;
	}
	public void setContractions(List<Contraction> contractions) {
		this.contractions = contractions;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	

}
