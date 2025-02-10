import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { sender, transporter } from "./nodemailer.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });
    console.log("Verification email sent successfully", info);
  } catch (error) {
    console.error(`Error sending verification email`, error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const info = await transporter.sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "🎉 Welcome to Eventflow! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #4CAF50; text-align: center;">🎉 Welcome to Eventflow, ${name}! 🎉</h2>
            <p style="font-size: 16px; color: #333; text-align: center;">
              We're thrilled to have you on board. Eventflow is your go-to platform for seamless event management and unforgettable experiences.
            </p>
            <p style="font-size: 16px; color: #333; text-align: center;">
              Get ready to explore, create, and enjoy events like never before.
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://eventflow-3ccq.onrender.com/" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
                Get Started 🚀
              </a>
            </div>
            <p style="font-size: 14px; color: #888; text-align: center; margin-top: 20px;">
              If you have any questions, feel free to <a href="kshirsagarpravin.1111@gmail.com" style="color: #4CAF50;">contact us</a>.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin-top: 20px;">
            <p style="font-size: 12px; color: #999; text-align: center;">
              © ${new Date().getFullYear()} Eventflow. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Welcome email sent successfully", info);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const info = await transporter.sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
    console.log("Password reset email sent successfully", info);
  } catch (error) {
    console.error(`Error sending password reset email`, error);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log("Password reset success email sent successfully", info);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);
    throw new Error(
      `Error sending password reset success email: ${error.message}`
    );
  }
};
