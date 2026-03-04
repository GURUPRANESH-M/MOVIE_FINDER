package com.example.SampleProject.repository;

import com.example.SampleProject.entity.FavoriteMovie;
import com.example.SampleProject.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<MovieEntity,Long> {
    public void deleteByImdbID(String imdbID);
    List<FavoriteMovie> findByUserEmail(String email);
}
