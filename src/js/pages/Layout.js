import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "../components/Footer";
import { ListHeader, ViewHeader } from "../components/Header";
import LoansList from "../components/LoansList";
import LoanView from "../components/LoanView";
import SortBar from "../components/SortBar";
import _ from "lodash";
import { fetchLoans } from "../actions/loansActions"
import { connect } from "react-redux"


@connect((store) => {
 return {
    loans: store.loans.loans,
    loansFetching: store.loans.fetching,
    loansFetched: store.loans.fetched,
    loansFetchError: store.loans.error
  };
})
//TODO show errors
export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.sorted = {
      id: null,
      order: null
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchLoans())
  }

  getLoan(id) {
    const { loans } = this.props;
    if (!loans) return;
    return loans.find(l => `${l.id}` === id);
  }

  changeOrder = (id, order) => {
    //const { loans } = this.props;
    //const newLoans = _.orderBy(loans, [id], [order]);
    //this.setState({loans: newLoans, sorted: {id: id, order: order} });
    return true;
  };

  render() {
    const { loans, loansFetched, loansFetching, loansFetchError } = this.props;
    const sorted = this.sorted;
    console.log("fetching: ", loansFetching, "error: ", loansFetchError);
    return (
      <Router>
        <div class="container">
          <div class="row">
            {loans.length > 0 && loansFetched &&
               <div class="col-lg-12">
                  <Route
                    path="/loan/:loanId"
                    render={({ match }) => (
                      <div>
                        <ViewHeader title="Zonky" />
                        <LoanView loan={this.getLoan(match.params.loanId)} />
                        <Footer />
                      </div>
                    )}
                  />
                  <Route
                    path="/"
                    exact={true}
                    render={() => (
                      <div>
                        <ListHeader title="Zonky">
                          <SortBar sortMethod={this.changeOrder} sorted={sorted}/>
                        </ListHeader>
                        <LoansList loans={loans} />
                        <Footer />
                      </div>
                    )}
                  />
                </div>
              }
              {loansFetching &&
                  <div class="loader"></div>
              }
              {loansFetchError &&
                <div class="text-danger">{loansFetchError}</div> 
              }
          </div>
        </div>
      </Router>
    );
  }
}
