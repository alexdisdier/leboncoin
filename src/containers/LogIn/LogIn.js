import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./LogIn.css";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    error: null
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://leboncoin-api.herokuapp.com/api/user/log_in",
        {
          email: this.state.email,
          password: this.state.password
        }
      );
      if (response.data.token) {
        this.props.setUser(response.data);
        this.props.history.push("/");
        console.log("success, check cookies");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="wrapper connection">
        <div className="sign-in-flex">
          <section>
            <h1>Connexion</h1>
            <form onSubmit={this.handleSubmit} className="form">
              <div className="form-item">
                <label htmlFor="email">Adresse email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="johndoe@gmail.com"
                />
              </div>

              <div className="form-item form-password">
                <div className="form-item">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <button type="submit">Se connecter</button>
            </form>

            <div className="create-account-redirect">
              <p>Vous n'avez pas de compte ?</p>
              <Link className="btn" to="/signup">
                Créer un compte
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default LogIn;
