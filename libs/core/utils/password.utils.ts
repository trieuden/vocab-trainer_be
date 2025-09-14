import * as bcrypt from 'bcrypt';


export async function hashPassword(password: string, saltRounds = 10): Promise<string> {
    return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export function generateRandomPassword(): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specials = '!@#$%^&*?';

    let password = [
        lowercase.charAt(Math.floor(Math.random() * lowercase.length)),
        uppercase.charAt(Math.floor(Math.random() * uppercase.length)),
        numbers.charAt(Math.floor(Math.random() * numbers.length)),
        specials.charAt(Math.floor(Math.random() * specials.length)),
    ].join('');

    const allChars = lowercase + uppercase + numbers + specials;
    for (let i = password.length; i < 8; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return password
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');
}