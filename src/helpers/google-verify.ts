import { OAuth2Client } from 'google-auth-library';


const googleClientId = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(googleClientId);

export const googleVerify = async ( id_token = '' ) => {

  const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: googleClientId
  });

  const { name, picture: img, email }: any = ticket.getPayload();
    
  return { name, img, email };

}