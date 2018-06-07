import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Geosuggest from 'react-geosuggest';
import TextField from 'material-ui/TextField';

import styles from '../styles/Register.module.css';

import {PrivateKey/* , PublicKey, Signature, Aes, key_utils, config */} from 'eosjs-ecc';

const componentForm = {
  street_number : 'short_name',
  route : 'long_name',
  locality : 'long_name',
  administrative_area_level_1 : 'short_name',
  country : 'long_name',
  postal_code : 'short_name'
};

class MyView extends Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
    this.onChangeLogoUrl = this.onChangeLogoUrl.bind(this);
    this.onChangeHost = this.onChangeHost.bind(this);
    this.onChangeHttpPort = this.onChangeHttpPort.bind(this);
    this.onChangeP2pPort = this.onChangeP2pPort.bind(this);
    this.onChangeHardwareSpec = this.onChangeHardwareSpec.bind(this);
    this.onChangeOfficialWebsite = this.onChangeOfficialWebsite.bind(this);
    this.onChangeTelegram = this.onChangeTelegram.bind(this);
    this.onGenerateKey = this.onGenerateKey.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);

    this.state = Object.assign({}, {}, this.props.producer);
  }

  componentWillReceiveProps(nextProps, prevState) {
    const {producer} = nextProps;
    this.setState(Object.assign({}, {}, producer));
  }

  handleUpdate(ev) {
    ev.preventDefault();
    this.props.handleUpdate(this.state);
  }

  onChangeOrganization(ev) {
    this.setState({organization : ev.target.value});
  }

  onChangeLogoUrl(ev) {
    this.setState({logo_url : ev.target.value});
  }

  onChangeHost(ev) {
    this.setState({host : ev.target.value});
  }

  onChangeHttpPort(ev) {
    this.setState({http_port : ev.target.value});
  }

  onChangeP2pPort(ev) {
    this.setState({p2p_port : ev.target.value});
  }

  onChangeHardwareSpec(ev) {
    this.setState({hardware_spec : ev.target.value});
  }

  onChangeOfficialWebsite(ev) {
    this.setState({official_website : ev.target.value});
  }

  onChangeTelegram(ev) {
    this.setState({telegram : ev.target.value});
  }

  onGenerateKey() {
    let privateWif;
    PrivateKey.randomKey()
      .then((privateKey) => {
        privateWif = privateKey.toWif();
        // Convert to a public key
        const pubKey = PrivateKey.fromWif(privateWif).toPublic().toString();
        this.setState({public_key : pubKey, private_key : privateWif});
      });
  }

  onChangeLocation(place) {
    const gmaps = place.gmaps;
    for (let i = 0; i < gmaps.address_components.length; i++) {
      const addressType = gmaps.address_components[i].types[0];
      if (componentForm[addressType]) {
        const val = gmaps.address_components[i][componentForm[addressType]],
          ref = this.refs[addressType];
        if (!_.isEmpty(ref)) {
          ref.value = val;
        }
      }
    }
    this.setState({loc_address : gmaps.formatted_address});
    this.setState({
      loc : {
        type : 'Point',
        coordinates : [place.location.lat, place.location.lng]
      }
    });
  }

  render() {
    return (
      <div className={styles.register}>
        <div className={styles.register__head}>
          <div className={styles.register__head_title}>
            <h2><strong>My Page</strong></h2>
          </div>
        </div>
        <div className={styles.register__content}>
          <div className={styles.form_area}>
            <div className={styles.text_field}>
              <form action="">
                <div>
                  <TextField
                    id="textField_email"
                    label="email address"
                    placeholder="email address"
                    value={this.state.email}
                    fullWidth
                    multiline
                    disabled={true}
                  />
                </div>
                <div>
                  <TextField
                    id="textField_name"
                    label="block producer name"
                    placeholder="block producer name"
                    value={this.state.name}
                    fullWidth
                    disabled={true}
                  />
                </div>
                <div>
                  <TextField
                    id="textField_host"
                    label="Organization Name"
                    name="organization"
                    placeholder="organization"
                    value={this.state.organization || ''}
                    onChange={this.onChangeOrganization}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id="textField_host"
                    label="Logo Url"
                    name="logo_url"
                    placeholder="logo url"
                    value={this.state.logo_url || ''}
                    onChange={this.onChangeLogoUrl}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id="textField_host"
                    label="Host"
                    placeholder="Host"
                    value={this.state.host}
                    onChange={this.onChangeHost}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id="textField_port__http"
                    label="http port"
                    placeholder="http port"
                    value={this.state.http_port}
                    onChange={this.onChangeHttpPort}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id="textField_port__p2p"
                    label="p2p port"
                    placeholder="p2p port"
                    value={this.state.p2p_port}
                    onChange={this.onChangeP2pPort}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id="textField_spec"
                    label="hardware spec"
                    placeholder="hardware spec"
                    value={this.state.hardware_spec}
                    onChange={this.onChangeHardwareSpec}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id="textField_website"
                    label="official website"
                    placeholder="official website"
                    value={this.state.official_website}
                    onChange={this.onChangeOfficialWebsite}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id="textField_telegram"
                    label="Telegram"
                    placeholder="Telegram"
                    value={this.state.telegram}
                    onChange={this.onChangeTelegram}
                    fullWidth
                  />
                </div>
              </form>
            </div>
            <div className={styles.additional_field}>
              <div className={styles.location_area}>
                <h3>location</h3>
                <div className={styles.location_area__content}>
                  <Geosuggest
                    // className={styles.register__geosuggest}
                    inputClassName={styles.register__geosuggest_input}
                    suggestsHiddenClassName={styles.register__geosuggest_suggests_hidden}
                    suggestItemClassName=""
                    onSuggestSelect={this.onChangeLocation} />
                  <div>
                    <TextField
                      id="textField_loc_address"
                      label="Address"
                      name="loc_address"
                      value={this.state.loc_address || ''}
                      disable="true"
                      fullWidth
                    />
                    <TextField
                      id="textField_loc"
                      label="Location"
                      name="loc"
                      value={this.state.loc.coordinates || ''}
                      disable="true"
                      fullWidth
                    />
                  </div>
                </div>
              </div>
              <div className={styles.keygenerator_area}>
                <div className={styles.keygenerator_area__output}>
                  <dl>
                    <dt>Public Key</dt>
                    <dd>
                      {
                        this.state.public_key
                      }
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.commit_area}>
            {
              (() => {
                if (this.props.producer.status === 0) {
                  return <button type="" onClick={this.handleUpdate}>Submit And GoValidation</button>;
                }
                return <button type="" onClick={this.handleUpdate}>Submit</button>;
              })()
            }
            <button type="" onClick={this.props.handleDownloadScript}>Download Script</button>

          </div>
        </div>
      </div>);
  }
}

MyView.propTypes = {
  handleUpdate : PropTypes.func.isRequired,
  handleDownloadScript : PropTypes.func.isRequired,
  producer : PropTypes.object.isRequired
};

export default MyView;
