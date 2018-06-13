import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';

import _ from 'lodash';

import GoogleMap from './GoogleMap';

const styles = (theme) => ({
  media : {
    height : 0,
    paddingTop : '100%' // 16:9
  },
  expand : {
    transform : 'rotate(0deg)',
    transition : theme.transitions.create('transform', {
      duration : theme.transitions.duration.shortest
    }),
    marginLeft : 'auto'
  },
  expandOpen : {
    transform : 'rotate(180deg)'
  },
  avatar : {
    backgroundColor : grey[500]
  }
});

const RecipeReviewCard = (props) => {
  const {producer_name, org, nodes, classes} = props;
  if (_.isEmpty(nodes) && _.isEmpty(org.location)) {
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <b>Producer Name</b> <br/>
            <div style={{marginLeft : '15px', marginTop : '5px'}}>
              {producer_name}
            </div>
          </CardContent>
          <CardContent>
            <b>Website</b> <br/>
            <Button variant="flat" disableRipple style={{textTransform : 'none'}} href={org.website} target="_blank" rel="noopener noreferrer"> {org.website} </Button>
          </CardContent>
          <CardContent>
            <b>EOS BP Information Standard</b> <br/>
            <sub>(If Block Producer follows the EOS BP Information Standard rules, you can get more information.)</sub> <br/>
            <Button style={{marginLeft : '15px', marginTop : '3px'}} variant="outlined" disableRipple href="https://github.com/eosrio/bp-info-standard" target="_blank" rel="noopener noreferrer"> bp-info-standard </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const f_nodes = [{
    prod_name : org.candidate_name,
    producer : {
      loc : {
        coordinates : [
          org.location.latitude,
          org.location.longitude
        ]
      }
    },
    url : org.branding.logo_256
  }];

  const p_nodes = nodes.map(
    (node) => (
      {
        prod_name : node.location.name,
        producer : {
          loc : {
            coordinates : [
              node.location.latitude,
              node.location.longitude
            ]
          }
        }
      }
    )
  );

  return (
    <div>
      <Card className={classes.card}>
        {org.candidate_name &&
          <CardHeader avatar={ <Avatar src={org.branding.logo_256} className={classes.avatar} /> }
            title={org.candidate_name}
            subheader={org.email}
          />
        }
        <CardContent>
          <b>Website</b> <br/>
          <Button variant="flat" disableRipple style={{textTransform : 'none'}} href={org.website} target="_blank" rel="noopener noreferrer"> {org.website} </Button>
        </CardContent>
        {org.social &&
          <CardContent>
            <b>Social</b><br/>
            {
              Object.keys(org.social).map(
                (key) => (
                  <div key={key}>
                    {key} : {org.social[key]}
                  </div>
                )
              )
            }
          </CardContent>
        }
        {_.isEmpty(org.branding.logo_1024) === false &&
          <div>
            <CardContent> <b>High Resolution Logo</b> </CardContent>
            <CardMedia className={classes.media} image={org.branding.logo_1024} />
          </div>
        }
        {_.isEmpty(nodes) === false &&
          <div>
            <CardContent>
              <b>Location</b> <br/>
              Organization <br/>
              <ul>
                <li>
                  {org.location.name} ({org.location.country})
                </li>
              </ul>
              Node <br/>
              <ul>
                {nodes.map((node, i) => (
                  <li key = {i}>
                    {node.location.name} ({node.location.country})
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardContent>
              <GoogleMap p_nodes={p_nodes} f_nodes={f_nodes}/>
            </CardContent>
          </div>
        }
      </Card>
    </div>
  );
};


RecipeReviewCard.propTypes = {
  classes : PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
