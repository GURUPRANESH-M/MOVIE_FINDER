package com.example.SampleProject;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<MovieEntity,Long> {
    public void deleteByImdbID(String imdbID);
}
