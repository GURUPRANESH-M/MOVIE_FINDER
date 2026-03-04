package com.example.SampleProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/movapi")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @PostMapping("/movie")
    public MovieEntity postMovie(@RequestBody MovieEntity movieEntity){
        return movieRepository.save(movieEntity);
    }
    @GetMapping
    public List<MovieEntity> getMovie(){
        return movieRepository.findAll();
    }

    @Transactional
    @DeleteMapping("/{id}")
    public void deleteByImdbid(@PathVariable String id){
        movieRepository.deleteByImdbID(id);
        }


}
