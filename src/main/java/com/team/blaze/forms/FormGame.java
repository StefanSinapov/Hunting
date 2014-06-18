package com.team.blaze.forms;

import com.team.blaze.dao.DAOFactory;
import com.team.blaze.dao.ScoreDAO;
import com.team.blaze.models.ConnectionType;
import com.team.blaze.models.Player;
import java.io.Serializable;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.faces.view.ViewScoped;
import javax.inject.Named;

@Named
@ViewScoped
public class FormGame implements Serializable
{
    private static final long serialVersionUID = 1L;
    private final DAOFactory dao;
    private final ScoreDAO scoreDAO;

    private String formHiddenInput;
    private String formName;

    public FormGame()
    {
        this.dao = DAOFactory.getInstance(ConnectionType.Default);
        this.scoreDAO = dao.getScoreDAO();
        System.out.println("Constructor");
    }

    @PostConstruct
    public void loadScores()
    {
        System.out.println("PostConstructor");

        List<Player> players = scoreDAO.listAllPlayers();

        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < players.size(); i++)
        {
            sb.append(i + 1);
            sb.append(',');
            sb.append(players.get(i).getName());
            sb.append(',');
            sb.append(players.get(i).getScore());

            if (i < players.size() - 1)
            {
                sb.append(',');
            }
        }

        this.formHiddenInput = sb.toString();

    }

    public String submit()
    {
        System.out.println("Button :" + this.formName + " " + this.formHiddenInput);

        int score = Integer.parseInt(this.formHiddenInput);
        Player player = new Player(score, this.formName);

        scoreDAO.createPlayer(player);
        return "index";
    }

    public String getFormHiddenInput()
    {
        return formHiddenInput;
    }

    public void setFormHiddenInput(String formHiddenInput)
    {
        this.formHiddenInput = formHiddenInput;
    }

    public String getFormName()
    {
        return formName;
    }

    public void setFormName(String formName)
    {
        this.formName = formName;
    }

}
