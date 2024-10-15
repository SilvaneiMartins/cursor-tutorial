import {
    Text,
    View,
    Alert,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [emailValido, setEmailValido] = useState(true);
    const [senhaValida, setSenhaValida] = useState(true);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const validarEmail = (texto: string) => {
        if (texto.trim() === "") return false;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(texto);
    };

    const handleEmailChange = (texto: string) => {
        setEmail(texto);
        setEmailValido(validarEmail(texto));
    };

    const handleSenhaChange = (texto: string) => {
        setSenha(texto);
        setSenhaValida(texto.length >= 8);
    };

    const handleLogin = () => {
        const emailEstaValido = validarEmail(email);
        const senhaEstaValida = senha.length >= 8;

        setEmailValido(emailEstaValido);
        setSenhaValida(senhaEstaValida);

        if (!emailEstaValido || !senhaEstaValida) {
            Alert.alert("Erro", "Por favor, corrija os campos inválidos.");
            return;
        }
        // TODO: Lógica de login aqui
        Alert.alert("Sucesso", "Login realizado com sucesso!");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>

            <TextInput
                value={email}
                style={[styles.input, !emailValido && styles.inputInvalido]}
                placeholder="E-mail"
                autoCapitalize="none"
                onChangeText={handleEmailChange}
                keyboardType="email-address"
            />
            {!emailValido && <Text style={styles.textoErro}>
                {email.trim() === "" ? "O e-mail é obrigatório" : "E-mail inválido"}
            </Text>}

            <View style={styles.senhaContainer}>
                <TextInput
                    value={senha}
                    secureTextEntry={!mostrarSenha}
                    placeholder="Senha"
                    style={[styles.inputSenha, !senhaValida && styles.inputInvalido]}
                    onChangeText={handleSenhaChange}
                />
                <TouchableOpacity
                    style={styles.botaoMostrarSenha}
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                >
                    <Ionicons
                        name={mostrarSenha ? "eye-off" : "eye"}
                        size={24}
                        color="#007AFF"
                    />
                </TouchableOpacity>
            </View>
            {!senhaValida && <Text style={styles.textoErro}>
                {senha === "" ? "A senha é obrigatória" : "A senha deve ter pelo menos 8 caracteres"}
            </Text>}

            <TouchableOpacity style={styles.botao} onPress={handleLogin}>
                <Text style={styles.textoBotao}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
        borderColor: "#ccc",
        paddingHorizontal: 10,
    },
    inputInvalido: {
        borderColor: "red",
    },
    senhaContainer: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 10,
    },
    inputSenha: {
        flex: 1,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
    },
    botaoMostrarSenha: {
        position: "absolute",
        right: 10,
        height: 40,
        justifyContent: "center",
    },
    botao: {
        padding: 10,
        width: "100%",
        borderRadius: 5,
        alignItems: "center",
        backgroundColor: "#007AFF",
    },
    textoBotao: {
        color: "white",
        fontWeight: "bold",
    },
    textoErro: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
        alignSelf: "flex-start",
    },
});
