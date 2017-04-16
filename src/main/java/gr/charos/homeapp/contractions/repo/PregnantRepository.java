package gr.charos.homeapp.contractions.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import gr.charos.homeapp.contractions.model.Pregnant;

public interface PregnantRepository extends MongoRepository<Pregnant,String> {

}
 