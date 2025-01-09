import React, { Component } from "react";
import "./App.css";
import Nestable from "react-nestable";

const data = [
  {
    id: 1,
    tag: "NAVXML",
    type: 'tag',
    matchKey: '',
    defaultValue: '',
    children: [
      { id: 2, tag: "DOCTYPE", type: 'text', matchKey: 'MESSAGETYPE', defaultValue: 'Return Order' },
      { id: 3, tag: "DOCACTION", type: 'text', matchKey: '', defaultValue: 'Insert' },
      { id: 4, tag: "SalesHeader", type: 'tag', matchKey: '', defaultValue: '',
        children: [
          { id: 5, tag: "EDIPOID", type: 'text', matchKey: '', defaultValue: ''},
          { id: 6, tag: "DocumentDate", type: 'text', matchKey: 'NETLOGMESSAGE.SENTTIMESTAMP', defaultValue: ''},
          { id: 7, tag: "SelltoCustomer", type: 'tag', matchKey: '', defaultValue: '',
            children: [
              { id: 8, tag: "SelltoCustomerNo", type: 'tag', matchKey: '', defaultValue: 'CU100XXX' }
            ]
          },
          { id: 9, tag: "YourReference", type: 'text', matchKey: 'NETLOGMESSAGE.MESSAGE.HEADER.DATA.ORDERID', defaultValue: ''},
          { id: 10, tag: "SalesLine", type: 'loop', matchKey: 'NETLOGMESSAGE.MESSAGE.HEADER.DATA.DATALEVEL2.DATA2', defaultValue: '',
            children: [
              { id: 11, tag: "No", type: 'text', matchKey: 'NETLOGMESSAGE.MESSAGE.HEADER.DATA.DATALEVEL2.DATA2[~]SKU', defaultValue: '' },
              { id: 12, tag: "SerialLot", type: 'text', matchKey: 'NETLOGMESSAGE.MESSAGE.HEADER.DATA.DATALEVEL2.DATA2[~]SERIAL', defaultValue: '' },
              { id: 13, tag: "Variant", type: 'text', matchKey: 'NETLOGMESSAGE.MESSAGE.HEADER.DATA.ORDERTYPE', defaultValue: '' },
              { id: 14, tag: "SalesLineComments", type: 'tag', matchKey: '', defaultValue: '',
                children: [
                  { id: 15, tag: "SalesLineCommentLine", type: 'text', matchKey: 'NETLOGMESSAGE.MESSAGE.HEADER.DATA.DATALEVEL2.DATA2[~]INVENTORYSTATUS', defaultValue: '' }
                ]
              }

            ]
          },
        ]
      }
    ]
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
            {item.tag}
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
        [item.id]: item.tag
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
          content: id === item.id ? newValue : item.tag,
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
    console.log(items,'0000000')
    console.log(this.state.data, '2222222')
    this.setState({ data: items })
  };

  onOrderConfirmChange = (...props) => {
    console.log(props, '0-0-0-0')
    return true;
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <div className="col-md-6">
          <Nestable
            items={data}
            renderItem={this.renderItem}
            onChange={this.onOrderChange}
            confirmChange={this.onOrderConfirmChange}
          />
        </div>
      </div>
    );
  }
}

export default App;