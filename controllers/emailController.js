const nodemailer = require('nodemailer');

const emailController = {};

emailController.sendEmail = async (emailData) => {
  const { email, nome, usuario, senha } = emailData;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'joaoprado225@gmail.com',
      pass: 'xlqc mosj vpkn tbww' // Substitua pela sua senha real
    }
  });

  const mailOptions = {
    from: 'joaoprado225@gmail.com',
    to: email,
    subject: '🔐 Senha de Acesso - Achei Ai 🔐',
    html: `
      <html>
        <body>
          <h1>Olá ${nome}!</h1>
          <p>Sua nova senha de acesso ao Achei Ai foi gerada aleatoriamente e é:</p>
          <h2>${senha}</h2>
          <p>O Achei Ai é uma plataforma incrível que ajuda você a encontrar os melhores lugares para sair na sua região.</p>
          <p>Queremos incentivar você a compartilhar suas experiências e avaliações sobre os estabelecimentos que visitar. Sua opinião é valiosa para nós e para outros usuários!</p>
          <p>Lembre-se de que esta senha pode ser trocada a qualquer momento através do nosso site, e encorajamos você a fazer isso após o primeiro login.</p>
          <p>Aproveite a plataforma, descubra novos lugares e ajude a tornar a vida noturna da sua cidade ainda mais vibrante e interessante!</p>
          <p>Atenciosamente,</p>
          <p>Equipe do Achei Ai</p>
        </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};

module.exports = emailController;
