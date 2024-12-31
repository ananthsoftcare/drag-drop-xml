import React, { Component } from "react";
import "./App.css";
import Nestable from "react-nestable";

const data = [
  {
    id: 1,
    content: "Getting Started with Redux: An Intro",
    heading: 1,
    elemt: "input",
    children: [
      { id: 2, content: "Table of Contents", heading: 2, elemt: "input" }
    ]
  },
  {
    id: 3,
    content: "The Core Concepts",
    heading: 1,
    elemt: "input",
    children: [
      {
        id: 4,
        content: "1. Single source of truth",
        heading: 2,
        elemt: "input"
      },
      {
        id: 5,
        content: "2. State is read-only",
        heading: 2,
        elemt: "input"
      },
      {
        id: 6,
        content: "3. Changes are made with pure functions",
        heading: 2,
        elemt: "input"
      }
    ]
  },
  {
    id: 7,
    content: "Best Practices",
    heading: 1,
    elemt: "input",
    children: [
      { id: 8, content: "State Shape", heading: 2, elemt: "input" },
      {
        id: 9,
        content: "Flat Objects",
        heading: 3,
        elemt: "input"
      },
      { id: 10, content: "Actions", heading: 2, elemt: "input" },
      {
        id: 11,
        content: "Reducers",
        heading: 2,
        elemt: "input"
      }
    ]
  },
  {
    id: 12,
    content: "Testing",
    heading: 1,
    elemt: "input",
    children: [
      { id: 13, content: "Action creators", heading: 2, elemt: "input" },
      {
        id: 14,
        content: "Reducers",
        heading: 2,
        elemt: "input"
      }
    ]
  },
  {
    id: 15,
    content: "Wrapping it up",
    heading: 1,
    elemt: "input",
    children: [
      { id: 16, content: "Free eBook", heading: 2, elemt: "input" },
      {
        id: 17,
        content: "Learn Node",
        heading: 2,
        elemt: "input"
      },
      { id: 18, content: "Carly Kubacak", heading: 2, elemt: "input" },
      {
        id: 19,
        content: "Carly Kubacak",
        heading: 2,
        elemt: "input"
      },
      {
        id: 20,
        content:
          "💖 A side project brought to you from Las Vegas and DC by...",
        heading: 3,
        elemt: "input"
      },
      {
        id: 21,
        content: "Easiest Local Dev Environment",
        heading: 2,
        elemt: "input"
      },
      {
        id: 22,
        content: "Get Started with Vue.js",
        heading: 2,
        elemt: "input"
      },
      { id: 23, content: "Scotch", heading: 2, elemt: "input" }
    ]
  },
  {
    id: 24,
    content: "Get Access",
    heading: 1,
    elemt: "input",
    children: []
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      edit: {}
    };
  }

  renderItem = ({ item }) => {
    const { edit } = this.state;

    return (
      <div>
        {typeof edit[item.id] !== 'undefined' ? (
          <div>
            <input
              type="text" value={edit[item.id]}
              onChange={e => this.onInputChange(e, item)}
            />
            <button onClick={e => this.onSave(e, item)}>
              save
            </button>
          </div>
        ) : (
          <div onDoubleClick={e => this.onStartEdit(e, item)}>
            {item.content}
          </div>
        )}
      </div>
    );
  };

  onInputChange = (e, item) => {
    this.setState({
      edit: {
        ...this.state.edit,
        [item.id]: e.target.value
      }
    });
  };

  onStartEdit = (e, item) => {
    this.setState({
      edit: {
        ...this.state.edit,
        [item.id]: item.content
      }
    });
  };

  onSave = (e, item) => {
    const { data, edit } = this.state;
    const id = item.id;
    const newValue = edit[id];
    console.log({ id, newValue });

    const updatedData = (list, value) => {
      return list.map(item => {
        return {
          ...item,
          content: id === item.id ? newValue : item.content,
          children: item.children && updatedData(item.children, value)
        };
      });
    };

    this.setState({
      data: updatedData(data, newValue),
      edit: {
        ...this.state.edit,
        [item.id]: undefined
      }
    });
  };

  onOrderChange = (items, item) => {
    this.setState({ data: items })
  };

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <div className="col-md-6">
          <Nestable
            items={data}
            renderItem={this.renderItem}
            onChange={this.onOrderChange}
          />
        </div>
      </div>
    );
  }
}

export default App;