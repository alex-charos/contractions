package gr.charos.homeapp.contractions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import gr.charos.homeapp.contractions.model.Contraction;
import gr.charos.homeapp.contractions.model.Pregnant;
import gr.charos.homeapp.contractions.repo.PregnantRepository;

@RestController
@RequestMapping("/api/contractions")
@CrossOrigin
public class ContractionController {
	
	@Autowired
	PregnantRepository repo;

	@RequestMapping(value = "/{pregnantId}", method = RequestMethod.GET)
	public Pregnant getPregnant(@PathVariable String pregnantId) {
		Pregnant pregnant= repo.findOne(pregnantId);

		return pregnant;
	}
	@RequestMapping( method = RequestMethod.GET)
	public List<Pregnant> getAllPregnants() {
		return repo.findAll();
	}
	@RequestMapping( method = RequestMethod.POST)
	public Pregnant savePregnant(@RequestBody Pregnant p ) {
		Pregnant pregnant= repo.save(p);

		return pregnant;
	}
	@RequestMapping(value = "/{pregnantId}", method = RequestMethod.POST)
	public Pregnant addContraction(@PathVariable String pregnantId, @RequestBody Contraction c ) {
		Pregnant pregnant= repo.findOne(pregnantId);
		pregnant.getContractions().add(c);
		pregnant= repo.save(pregnant);

		return pregnant;
	}
}
