import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FileSaver from 'file-saver';

import Geosuggest from 'react-geosuggest';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

import Button from 'material-ui/Button';

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

class RegistrationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      producer : {
        email : '',
        passwd : '',
        repeat_passwd : '',
        name : '',
        organization : '',
        logo_url : '',
        host : '',
        http_port : '',
        p2p_port : '',
        hardware_spec : '',
        official_website : '',
        telegram : '',
        public_key : '',
        location : '',
        loc : {}
      }
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onGenerateKey = this.onGenerateKey.bind(this);
    this.onSaveKey = this.onSaveKey.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
  }

  componentWillMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.producer.passwd) {
        return false;
      }
      return true;
    });
  }

  handleRegister(ev) {
    ev.preventDefault();
    this.props.handleRegister(this.state.producer);
  }

  onChange(ev) {
    const {producer} = this.state;
    producer[ev.target.name] = ev.target.value;
    this.setState({producer});
  }

  onGenerateKey() {
    const {producer} = this.state;
    let privateWif;
    PrivateKey.randomKey()
      .then((privateKey) => {
        privateWif = privateKey.toWif();
        // Convert to a public key
        const pubKey = PrivateKey.fromWif(privateWif).toPublic().toString();
        producer.public_key = pubKey;
        producer.private_key = privateWif;
        this.setState({producer});
      });
  }

  onSaveKey() {
    const {producer} = this.state;
    const type = 'text/plain';
    const data = `public_key : ${producer.public_key}\nprivate_key : ${producer.private_key}`;
    const blob = new Blob([data], {type : type});
    FileSaver.saveAs(blob, 'eoseoul_node_key.txt');
  }

  onChangeLocation(place) {
    if (_.isEmpty(place)) {
      return;
    }
    const {producer} = this.state;
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
    producer.loc_address = gmaps.formatted_address;
    producer.loc = {
      type : 'Point',
      coordinates : [place.location.lat, place.location.lng]
    };
    this.setState({producer});
  }

  render() {
    const {producer} = this.state;
    return (
      <div className={styles.register}>
        <div className={styles.register__head}>
          <div className={styles.register__head_title}>
            <h2><strong>Registration</strong></h2>
          </div>
        </div>
        <div className={styles.register__content}>
          <div className={styles.form_area}>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleRegister}
            >
              <div className={styles.text_field}>
                <div>
                  <TextValidator
                    id="textField_email"
                    name="email"
                    label="email address"
                    placeholder="email address"
                    value={producer.email}
                    onChange={this.onChange}
                    fullWidth
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_password"
                    label="Password"
                    name="passwd"
                    placeholder="Password"
                    value={producer.passwd}
                    onChange={this.onChange}
                    type="password"
                    fullWidth
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_passwordChk"
                    label="Password Check"
                    name="repeat_passwd"
                    placeholder="Repeat Password"
                    value={producer.repeat_passwd}
                    onChange={this.onChange}
                    type="password"
                    fullWidth
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_name"
                    label="Block Producer Name"
                    name="name"
                    placeholder="12345abcdefghijklmnopqrstuvwxyz (must be 12 characters)"
                    value={producer.name}
                    onChange={this.onChange}
                    fullWidth
                    validators={['minStringLength:12', 'maxStringLength:12', 'matchRegexp:^[a-z12345]*$']}
                    errorMessages={['this field is required', 'name is not valid']}
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_organization"
                    label="Organization Name"
                    name="organization"
                    placeholder="organization"
                    value={producer.organization}
                    onChange={this.onChange}
                    fullWidth
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_host"
                    label="Host"
                    name="host"
                    placeholder="host name ex)eosio.net"
                    value={producer.host}
                    onChange={this.onChange}
                    fullWidth
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_port__http"
                    label="Http Port"
                    name="http_port"
                    placeholder="http port"
                    value={producer.http_port}
                    onChange={this.onChange}
                    fullWidth
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_port__p2p"
                    label="P2P Port"
                    name="p2p_port"
                    placeholder="p2p port"
                    value={producer.p2p_port}
                    onChange={this.onChange}
                    fullWidth
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_spec"
                    label="Hardware Spec"
                    name="hardware_spec"
                    placeholder="hardware spec"
                    value={producer.hardware_spec}
                    onChange={this.onChange}
                    fullWidth
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_website"
                    label="Official Website"
                    name="official_website"
                    placeholder="official website"
                    value={producer.official_website}
                    onChange={this.onChange}
                    fullWidth
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_logo"
                    label="Logo Url"
                    name="logo_url"
                    placeholder="logo url"
                    value={producer.logo_url}
                    onChange={this.onChange}
                    fullWidth
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_telegram"
                    label="Telegram"
                    name="telegram"
                    placeholder="Telegram"
                    value={producer.telegram}
                    onChange={this.onChange}
                    fullWidth
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </div>
                <div>
                  <TextValidator
                    id="textField_public_key"
                    label="Public Key"
                    name="public_key"
                    placeholder="click 'Create Keypairs Button'"
                    value={producer.public_key}
                    onChange={this.onChange}
                    fullWidth
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </div>
                <div className={styles.commit_area}>
                  <Button type="submit">Register Block Producer</Button>
                </div>
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
                    <div className={styles.location_area__textbox}>
                      <TextValidator
                        id="textField_loc_address"
                        label="Address"
                        name="loc_address"
                        value={producer.loc_address || ''}
                        disable="true"
                        fullWidth
                        validators={['required']}
                        errorMessages={['this field is required']}
                      />
                      <TextValidator
                        id="textField_loc"
                        label="Location"
                        name="loc"
                        value={producer.loc.coordinates || ''}
                        disable="true"
                        fullWidth
                        validators={['required']}
                        errorMessages={['this field is required']}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.keygenerator_area}>
                  <div className={styles.keygenerator_area__button}>
                    <button type='button' onClick={this.onGenerateKey}> Create Keypairs </button>
                    <button type='button' onClick={this.onSaveKey}> Save Keypairs </button>
                  </div>
                  <div className={styles.keygenerator_area__output}>
                    <p>Do Not Forget to Save Public Key and Private Key</p>
                    <dl>
                      <dt>Public Key</dt>
                      <dd>
                        {
                          producer.public_key
                        }
                      </dd>
                    </dl>
                    <dl>
                      <dt>Private Key</dt>
                      <dd>
                        {
                          producer.private_key
                        }
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

            </ValidatorForm>
          </div>
        </div>
      </div>);
  }
}

RegistrationView.propTypes = {
  handleRegister : PropTypes.func.isRequired
};

export default RegistrationView;
