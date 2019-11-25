import PropTypes from 'prop-types';
import React from 'react';
import Condition from './Condition';
import QueryParser from './helpers/QueryParser';
import '../styles.css';

function buildDefaultConfig(config) {
  const defConfig = config || {};
  defConfig.query = defConfig.query ? defConfig.query : '()';
  defConfig.operators = defConfig.operators ? defConfig.operators :
    [
      { operator: '=', label: '=' },
      { operator: '<>', label: '<>' },
      { operator: '<', label: '<' },
      { operator: '>', label: '>' },
      { operator: '>=', label: '>=' },
      { operator: '<=', label: '<=' },
      { operator: 'is null', label: 'Null' },
      { operator: 'is not null', label: 'Not Null' },
      { operator: 'in', label: 'In' },
      { operator: 'not in', label: 'Not In' },
    ];
  defConfig.combinators = defConfig.combinators ? defConfig.combinators :
    [
      { combinator: 'AND', label: 'And' },
      { combinator: 'OR', label: 'Or' },
      { combinator: 'NOT', label: 'Not' },
    ];
  defConfig.animation = defConfig.animation ? defConfig.animation : 'none';
  defConfig.styles = defConfig.styles ? defConfig.styles : {
    primaryBtn: 'queryButtonPrimary',
    deleteBtn: 'queryButtonDelete',
    rule: 'rule',
    condition: 'condition',
    select: 'querySelect',
    input: 'queryInput',
    txtArea: 'queryText',
    error: 'error',
  };
  return defConfig;
}

function fillDefaultButtonsText(buttonsText) {
  const defBtnText = buttonsText || {};
  defBtnText.addRule = defBtnText.addRule ? defBtnText.addRule : 'Add rule';
  defBtnText.addGroup = defBtnText.addGroup ? defBtnText.addGroup : 'Add group';
  defBtnText.clear = defBtnText.clear ? defBtnText.clear : 'Clear';
  defBtnText.delete = defBtnText.delete ? defBtnText.delete : 'Delete';
  return defBtnText;
}

class TwoWayQuerybuilder extends React.Component {
  constructor(props) {
    super(props);
    this.config = buildDefaultConfig(props.config);
    this.buttonsText = fillDefaultButtonsText(props.buttonsText);
    const defaultData = {
      combinator: this.config.combinators[0].combinator,
      nodeName: '1',
      rules: [],
    };
    this.state = {
      data: this.config.query === '()' ? defaultData : QueryParser.parseToData(this.config.query, this.config),
      query: this.config.query === '()' ? null : this.config.query,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    const queryObj = {};
    queryObj.data = data;
    queryObj.query = QueryParser.parseToQuery(data);
    this.setState({ query: queryObj.query });
    if (this.props.onChange) {
      this.props.onChange(queryObj);
    }
  }

  render() {
    return (<div className="query-builder">
      <Condition
        config={this.config}
        buttonsText={this.buttonsText}
        fields={this.props.fields}
        nodeName="1"
        data={this.state.data}
        onChange={this.handleChange}
      />
      <svg style={{display: "none"}}><defs><symbol id="queryicon-add" viewBox="0 0 24 24"><path d="M12 20q3.3 0 5.6-2.4T20 12t-2.4-5.6T12 4 6.4 6.4 4 12t2.4 5.6T12 20zm0-18q4.1 0 7 3t3 7-3 7-7 3-7-3-3-7 3-7 7-3zm1 5v4h4v2h-4v4h-2v-4H7v-2h4V7h2z"/></symbol><symbol id="queryicon-remove" viewBox="0 0 24 24"><path d="M12 20q3.3 0 5.6-2.4T20 12t-2.4-5.6T12 4 6.4 6.4 4 12t2.4 5.6T12 20zm0-18q4.1 0 7 3t3 7-3 7-7 3-7-3-3-7 3-7 7-3zm-5 9h10v2H7v-2z"/></symbol><symbol id="queryicon-add-group" viewBox="0 0 24 24"><path d="M2 16v-2h8v2H2zm16-2h4v2h-4v4h-2v-4h-4v-2h4v-4h2v4zm-4-8v2H2V6h12zm0 4v2H2v-2h12z"/></symbol></defs></svg>
    </div>);
  }
}

TwoWayQuerybuilder.propTypes = {
  buttonsText: PropTypes.object,
  config: PropTypes.object,
  fields: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

TwoWayQuerybuilder.defaultProps = {
  buttonsText: {},
};

export default TwoWayQuerybuilder;
