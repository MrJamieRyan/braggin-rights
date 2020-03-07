package com.codeclan.example.BragginRights.models;

import javax.persistence.*;

@Entity
@Table(name="predictions")
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="prediction")
    private String predictionTitle;

    @ManyToOne
    @JoinColumn(name="player_id", nullable = false)
    private Player player;

    @ManyToOne
    @JoinColumn(name="predictable_id", nullable=false)
    private Predictable predictable;


    public Prediction(String predictionTitle, Player player, Predictable predictable) {
        this.id = id;
        this.predictionTitle = predictionTitle;
        this.player = player;
        this.predictable = predictable;

    }

    public Prediction(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Predictable getPredictable() {
        return predictable;
    }

    public void setPredictable(Predictable predictable) {
        this.predictable = predictable;
    }

    public String getPredictionTitle() {
        return predictionTitle;
    }

    public void setPredictionTitle(String predictionTitle) {
        this.predictionTitle = predictionTitle;
    }
}

