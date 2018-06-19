import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';

import _ from 'lodash';

import GoogleMap from './GoogleMap';

const styles = (theme) => ({
  card : {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'center'
  },
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
  },
  anchor : {
    fontSize: '0.875rem',
    color: '#434053',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
  }
});

const RecipeReviewCard = (props) => {
  const {producer_name, org, nodes, classes} = props;
  if (_.isEmpty(nodes) && _.isEmpty(org.location)) {
    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography gutterBottom align="center" variant="headline" component="h3">
              Producer Name
            </Typography>
            <div style={{marginLeft : '15px', marginTop : '5px'}}>
              {producer_name}
            </div>
          </CardContent>
          <CardContent className={classes.content}>
            <Typography gutterBottom align="center" variant="headline" component="h3">
              Website
            </Typography>
            <Button variant="flat" disableRipple style={{textTransform : 'none'}} href={org.website} target="_blank" rel="noopener noreferrer"> {org.website} </Button>
          </CardContent>
          <CardContent className={classes.content}>
            <Typography gutterBottom align="center" variant="headline" component="h3">
              EOS BP Information Standard
            </Typography>
            <Typography gutterBottom align="center" variant="caption">(If Block Producer follows the EOS BP Information Standard rules, you can get more information.)</Typography>
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
      <Card className={classes.card} style={{padding: 40}}>
        {org.candidate_name &&
          <div style={{textAlign: 'center'}}>
            <img src={org.branding.logo_256} alt={org.candidate_name}/>
            <CardHeader
              title={org.candidate_name}
              subheader={org.email}
            />
          </div>
        }
        <CardContent className={classes.content}>
          <Typography gutterBottom align="center" variant="headline" component="h3">
            Website
          </Typography>
          <Button variant="flat" disableRipple style={{textTransform : 'none'}} href={org.website} target="_blank" rel="noopener noreferrer"> {org.website} </Button>
        </CardContent>
        {org.social &&
          <CardContent className={classes.content}>
            <Typography gutterBottom align="center" variant="headline" component="h3">
              Social
            </Typography>
            <ul>
            {
              Object.keys(org.social).map(
                (key) => (
                  <li className={classes.anchor} key={key}>
                    {key} : {org.social[key]}
                  </li>
                )
              )
            }
            </ul>
          </CardContent>
        }
        {_.isEmpty(org.branding.logo_1024) === false &&
          <div>
            <CardContent className={classes.content}>
              <Typography gutterBottom align="center" variant="headline" component="h3">
                High Resolution Logo
              </Typography>
              <CardMedia className={classes.media} image={org.branding.logo_1024} />
            </CardContent>
          </div>
        }
        {_.isEmpty(nodes) === false &&
          <div>
            <CardContent className={classes.content}>
              <Typography gutterBottom align="center" variant="headline" component="h3">
                Location
              </Typography>
              <Typography gutterBottom variant="subheading" component="h4">
                Organization
              </Typography>
              <ul>
                <li className={classes.anchor}>
                  {org.location.name} ({org.location.country})
                </li>
              </ul>
              <Typography gutterBottom variant="subheading" component="h4">
                Node
              </Typography>
              <ul>
                {nodes.map((node, i) => (
                  <li className={classes.anchor} key = {i}>
                    {node.location.name} ({node.location.country})
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardContent className={classes.content}>
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
