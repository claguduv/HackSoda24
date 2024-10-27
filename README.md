# PASSGEN CHROME EXTENSION

**PassGen** is a powerful, secure, and offline Chrome Extension for generating unique, cryptographically strong passwords tailored to each of your accounts. With PassGen, your passwords are generated based on a consistent and personalized algorithm, eliminating the need to remember multiple passwords. Your data remains secure and private, as nothing is stored or sent online.

---

## KEY BENEFITS

- **Works Offline**: No internet needed; your data never leaves your device.
- **Data Privacy**: No data is stored or tracked.
- **Uncrackable Security**: Robust cryptographic algorithms ensure strong passwords.
- **No Forgotten Passwords**: You only need your secret key.
- **Dynamic Password Generation**: Generate strong, unique passwords on-the-go, without storage.
- **Consistency**: The same input always yields the same password.
- **Infinite Passwords**: One key allows secure access across all accounts.
- **Personalized and Strong**: Each account has its unique, strong password.

---

## HOW IT WORKS:

PassGen is a hashed password generator that simplifies password management by creating a unique, secure password for each of your accounts based on consistent inputs. PassGen produces passwords that are neither random nor stored, making it unique among password generators. Instead, PassGen uses personalized details to produce a secure password for each account that only you can recreate.

---

## SECURITY & ALGORITHM

1. **Input Data**: You provide the website name, username, and a secret key.
2. **Initial Hashing**: The input data is hashed using **SHA3-512**.
3. **Scrypt Hashing**: The SHA3-512 output is then hashed using the **scrypt** algorithm, providing a highly secure, memory and CPU-intensive hash.
4. **Random Number Generation**: The scrypt output seeds the **SHAKE-256 CSPRNG**, generating a 256-bit random number.
5. **Character Selection**:
    - The 256-bit random number is used to generate indices for each character in the password.
    - A loop runs to ensure the password includes symbols, lowercase letters, uppercase letters, and numbers at specified positions.
6. **Password Construction**: Characters are selected from predefined sets (symbols, lowercase, uppercase, numbers) based on the generated indices, ensuring a strong and secure password.
7. **Final Password**: The password is constructed and displayed, with all operations happening locally and securely.

---

### Security Highlights

- **No Data Storage**: No user data is stored at any point.
- **Real-time Processing**: All operations are performed in real-time and discarded immediately after use.
- **High Entropy**: Ensures maximum security suitable for the intended threat model.

---

## Simplified Diagram Explanation

1. **Input Data**:
    - Website: `"example.com"`
    - Username: `"user"`
    - Secret Key: `"secret"`

2. **Hashing Process**:
    - **SHA3-512** -> **Scrypt**

3. **Password Generation**:
    - Use **SHAKE-256** for random number generation.
    - Generate indices for password characters.
    - Select characters based on indices from symbol, lowercase, uppercase, and number sets.
    - Construct the final password.

By breaking down the process into these steps, PassGen ensures the creation of strong, secure passwords while maintaining user privacy and security.

---

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/claguduv/HackSoda24.git

2. **Navigate to the directory:**:
   ```bash
cd HackSode24

3. **Install dependencies:**:
npm install webpack webpack-cli @pashword/pashword-lib --save-dev

4. **Run the extension::**:
npx webpack

