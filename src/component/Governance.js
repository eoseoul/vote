import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import contentStyles from '../styles/content.module.css';

const Governance = (props) => {
  return (
    <Card className={contentStyles.content}>
      <CardContent>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="heading" component="h2" gutterBottom>
              Governance
            </Typography>
            <Typography variant="subheading" gutterBottom>
              This Constitution is a multi-party contract entered into by the Members by virtue of their use of this blockchain.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article I - No Initiation of Violence </Typography>
            <Typography variant="subheading" gutterBottom>
              Members shall not initiate violence or the threat of violence against another Member. Lawful prosecution of crimes with the goal of preserving life, liberty and property does not constitute initiation of violence.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article II - No Perjury
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Members shall be liable for losses caused by false or misleading attestations and shall forfeit any profit gained thereby.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article III - Rights
            </Typography>
            <Typography variant="subheading" gutterBottom>
              The Members grant the right of contract and of private property to each other, therefore no property shall change hands except with the consent of the owner, by a valid Arbitrator’s order, or via community referendum. This Constitution creates no positive rights for or between any Members.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article IV - No Vote Buying
            </Typography>
            <Typography variant="subheading" gutterBottom>
              No Member shall offer nor accept anything of value in exchange for a vote of any type, nor shall any Member unduly influence the vote of another.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article V - No Fiduciary
            </Typography>
            <Typography variant="subheading" gutterBottom>
              No Member nor EOS token holder shall have fiduciary responsibility to support the value of the EOS token. The Members do not authorize anyone to hold assets, borrow, nor contract on behalf of EOS token holders collectively. This blockchain has no owners, managers or fiduciaries; therefore, no Member shall have beneficial interest in more than 10% of the EOS token supply.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article VI - Restitution
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Each Member agrees that penalties for breach of contract may include, but are not limited to, fines, loss of account, and other restitution.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article VII - Open Source
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Each Member who makes available a smart contract on this blockchain shall be a Developer. Each Developer shall offer their smart contracts via a free and open source license, and each smart contract shall be documented with a Ricardian Contract stating the intent of all parties and naming the Arbitration Forum that will resolve disputes arising from that contract.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article VIII - Language
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Multi-lingual contracts must specify one prevailing language in case of dispute and the author of any translation shall be liable for losses due to their false, misleading, or ambiguous attested translations.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article IX - Dispute Resolution
            </Typography>
            <Typography variant="subheading" gutterBottom>
              All disputes arising out of or in connection with this Constitution shall be finally settled under the Rules of Dispute Resolution of the EOS Core Arbitration Forum by one or more arbitrators appointed in accordance with the said Rules.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article X - Choice of Law
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Choice of law for disputes shall be, in order of precedence, this Constitution and the Maxims of Equity.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article XI - Amending
            </Typography>
            <Typography variant="subheading" gutterBottom>
              This Constitution and its subordinate documents shall not be amended except by a vote of the token holders with no less than 15% vote participation among tokens and no fewer than 10% more Yes than No votes, sustained for 30 continuous days within a 120 day period.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article XII - Publishing
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Members may only publish information to the Blockchain that is within their right to publish. Furthermore, Members voluntarily consent for all Members to permanently and irrevocably retain a copy, analyze, and distribute all broadcast transactions and derivative information.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article XIII - Informed Consent
            </Typography>
            <Typography variant="subheading" gutterBottom>
              All service providers who produce tools to facilitate the construction and signing of transactions on behalf of other Members shall present to said other Members the full Ricardian contract terms of this Constitution and other referenced contracts. Service providers shall be liable for losses resulting from failure to disclose the full Ricardian contract terms to users.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article XIV - Severability
            </Typography>
            <Typography variant="subheading" gutterBottom>
              If any part of this Constitution is declared unenforceable or invalid, the remainder will continue to be valid and enforceable.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article XV - Termination of Agreement
            </Typography>
            <Typography variant="subheading" gutterBottom>
              A Member is automatically released from all revocable obligations under this Constitution 3 years after the last transaction signed by that Member is incorporated into the blockchain. After 3 years of inactivity an account may be put up for auction and the proceeds distributed to all Members according to the system contract provisions then in effect for such redistribution.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article XVI - Developer Liability
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Members agree to hold software developers harmless for unintentional mistakes made in the expression of contractual intent, whether or not said mistakes were due to actual or perceived negligence.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article XVII - Consideration
            </Typography>
            <Typography variant="subheading" gutterBottom>
              All rights and obligations under this Constitution are mutual and reciprocal and of equally significant value and cost to all parties.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article XVIII - Acceptance
            </Typography>
            <Typography variant="subheading" gutterBottom>
              A contract is deemed accepted when a member signs a transaction which incorporates a TAPOS proof of a block whose implied state incorporates an ABI of said contract and said transaction is incorporated into the blockchain.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article XIX - Counterparts
            </Typography>
            <Typography variant="subheading" gutterBottom>
              This Constitution may be executed in any number of counterparts, each of which when executed and delivered shall constitute a duplicate original, but all counterparts together shall constitute a single agreement.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Article XX - Interim Constitution
            </Typography>
            <Typography variant="subheading" gutterBottom>
              This constitution is interim and is intended to remain in effect until a permanent constitution is written and ratified in a referendum.
            </Typography>
          </Grid>
        </Grid>

      </CardContent>
    </Card>);
};

export default Governance;
