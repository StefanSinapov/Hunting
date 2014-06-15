package com.team.blaze.forms;

import com.team.blaze.dao.DAOFactory;
import com.team.blaze.dao.ScoreDAO;
import com.team.blaze.models.ConnectionType;
import com.team.blaze.models.Player;
import java.io.Serializable;
import java.util.List;
import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

@Named(value = "formGame")
@RequestScoped
public class FormGame implements Serializable
{
    private static final long serialVersionUID = 1L;
    private final DAOFactory dao;
    private final ScoreDAO scoreDAO;

    private String formHiddenInput;

    public FormGame()
    {
        this.dao = DAOFactory.getInstance(ConnectionType.Default);
        this.scoreDAO = dao.getScoreDAO();

    }

    public void loadScores()
    {
        List<Player> players = scoreDAO.listAllPlayers();

        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < players.size(); i++)
        {
            sb.append(players.get(i).getPlayerId());
            sb.append(',');
            sb.append(players.get(i).getName());
            sb.append(',');
            sb.append(players.get(i).getScore());

            if (i < players.size() - 1)
            {
                sb.append(',');
            }
        }

        System.out.println("Log Scores: " + sb.toString());
        this.formHiddenInput = sb.toString();

    }

    public String getFormHiddenInput()
    {
        return formHiddenInput;
    }

    public void setFormHiddenInput(String formHiddenInput)
    {
        this.formHiddenInput = formHiddenInput;
    }

    public void saveScores()
    {
        System.out.println(this.formHiddenInput);
        System.out.println("Saving scores.");
    }

}
