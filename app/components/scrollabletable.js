import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DevButton from './devbutton';

export default function ScrollableTable(props) {
  return (
    <ScrollableTableStyleWrapper>
      <div>
        {props.data.length ? (
          <div id="table-scroll">
            <div className="table-wrap">
              <table className="main-table">
                <thead>
                  <tr>
                    {Object.keys(props.data[0]).map(key => (
                      <th scope="col" key={key}>
                        {key}
                      </th>
                    ))}
                    {props.details && <th scope="col"> Details </th>}
                  </tr>
                </thead>
                <tbody>
                  {props.data.map(items => (
                    <tr key={Math.random().toString() + items.length}>
                      {Object.keys(items).map(key => (
                        <td key={key + Math.random().toString()}>
                          {items[key]}
                        </td>
                      ))}
                      {props.details && (
                        <td>
                          <Link to={props.detailsLink}>
                            <DevButton>
                              <h6 className="table-btn btn dev-btn btn-2">
                                Details
                              </h6>
                            </DevButton>
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="main-table">
              <thead />
              <tbody>
                <tr>
                  <td>Mafi sheghel ya man </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ScrollableTableStyleWrapper>
  );
}

const ScrollableTableStyleWrapper = styled.div`
  position: relative;
  max-width: 100%;
  margin: auto;
  overflow: hidden;
  border: none;

  .table-btn {
    min-width: 120px;
    height: 30px;
    line-height: 30px;
  }
  .table-wrap {
    width: 100%;
    overflow: auto;
  }
  table {
    width: 100%;
    margin: auto;
    table-layout: auto;
    border-collapse: collapse;
    border-spacing: 0;
  }
  th,
  td {
    padding: 10px 15px;
    border: none;
    white-space: nowrap;
  }
  thead {
    background-color: inherit;
  }

  tbody tr:nth-child(even) {
    background-color: #f8f9f9;
  }
  tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
  }
`;

ScrollableTable.propTypes = {
  data: PropTypes.array,
  details: PropTypes.bool,
  detailsLink: PropTypes.string,
};
