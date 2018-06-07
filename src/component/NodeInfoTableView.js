import React from 'react';
import NodeInfo from './NodeInfo';

const TableRow = (props) => {
  const node = props.node;
  const idx = props.idx + 1;
  return (
    <tr>
      <td>
        {idx}
      </td>
      <td>
        <NodeInfo node={node}/>
      </td>
      <td>
        {node.latency}
      </td>
      <td>
        {node.produced}
      </td>
      <td>
        {node.latestBlock}
      </td>
      <td>
        {node.irreversibleBlock}
      </td>
    </tr>
  );
};

const NodeInfoTable = (props) => (
  <div>
    {props.title}
    <table>
      <tbody>
        <tr>
          <th>
            #
          </th>
          <th>
            BlockProducer
          </th>
          <th>
            latency<br/>
            (server,client)
          </th>
          <th>
            produced
          </th>
          <th>
            latest block
          </th>
          <th>
            irreversible_block
          </th>
        </tr>
        {
          props.nodes ? props.nodes.map((node, idx) => (
            <TableRow node={node} idx={idx} key={idx}/>
          )) : null
        }
      </tbody>
    </table>
  </div>
);

export default NodeInfoTable;
