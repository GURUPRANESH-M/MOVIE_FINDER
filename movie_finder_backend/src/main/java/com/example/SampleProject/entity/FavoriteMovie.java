package com.example.SampleProject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class FavoriteMovie {

    @Id
    private String imdbID;

    private String title;

    private String year;

    private String poster;

    private String userEmail;

}
