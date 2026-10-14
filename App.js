import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
} from 'react-native';

export default function App() {
  // Datos que escribe el usuario (onChangeText)
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [pasatiempo, setPasatiempo] = useState('');

  // Switches (onValueChange)
  const [modoOscuro, setModoOscuro] = useState(false);
  const [mostrarPasatiempo, setMostrarPasatiempo] = useState(true);

  // Tarjeta generada (null = todavía no se crea)
  const [tarjeta, setTarjeta] = useState(null);

  // Evento onPress: crear la tarjeta
  const crearTarjeta = () => {
    if (nombre.trim() === '') {
      alert('Escribe tu nombre para crear la tarjeta');
      return;
    }
    setTarjeta({
      nombre: nombre.trim(),
      carrera: carrera.trim() || 'Sin especificar',
      pasatiempo: pasatiempo.trim() || 'Sin especificar',
    });
  };

  // Evento onPress: limpiar todo
  const limpiar = () => {
    setNombre('');
    setCarrera('');
    setPasatiempo('');
    setTarjeta(null);
  };

  const tema = modoOscuro ? estilosOscuros : estilosClaros;

  return (
    <View style={[styles.container, tema.fondo]}>
      <Text style={[styles.titulo, tema.texto]}>Mi tarjeta personal</Text>

      <TextInput
        style={[styles.input, tema.input]}
        placeholder="Nombre"
        placeholderTextColor="gray"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={[styles.input, tema.input]}
        placeholder="Carrera u ocupación"
        placeholderTextColor="gray"
        value={carrera}
        onChangeText={setCarrera}
      />
      <TextInput
        style={[styles.input, tema.input]}
        placeholder="Pasatiempo favorito"
        placeholderTextColor="gray"
        value={pasatiempo}
        onChangeText={setPasatiempo}
      />

      <View style={styles.fila}>
        <Text style={tema.texto}>Modo oscuro</Text>
        <Switch value={modoOscuro} onValueChange={setModoOscuro} />
      </View>
      <View style={styles.fila}>
        <Text style={tema.texto}>Mostrar pasatiempo</Text>
        <Switch
          value={mostrarPasatiempo}
          onValueChange={setMostrarPasatiempo}
        />
      </View>

      <View style={styles.botones}>
        <Button title="Crear tarjeta" onPress={crearTarjeta} />
        <Button title="Limpiar" color="red" onPress={limpiar} />
      </View>

      {tarjeta && (
        <View style={styles.tarjeta}>
          <Text style={styles.tarjetaNombre}>{tarjeta.nombre}</Text>
          <Text style={styles.tarjetaTexto}>Carrera: {tarjeta.carrera}</Text>
          {mostrarPasatiempo && (
            <Text style={styles.tarjetaTexto}>
              Pasatiempo: {tarjeta.pasatiempo}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 42,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 8,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginVertical: 16,
  },
  tarjeta: {
    width: '90%',
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius: 14,
    marginTop: 10,
  },
  tarjetaNombre: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tarjetaTexto: {
    color: 'white',
    fontSize: 16,
  },
});

// Estilos que cambian según el Switch de modo oscuro
const estilosClaros = StyleSheet.create({
  fondo: { backgroundColor: '#f5f5f5' },
  texto: { color: '#222' },
  input: { borderColor: 'gray', backgroundColor: 'white', color: '#222' },
});

const estilosOscuros = StyleSheet.create({
  fondo: { backgroundColor: '#1e1e1e' },
  texto: { color: '#f5f5f5' },
  input: { borderColor: '#777', backgroundColor: '#333', color: '#f5f5f5' },
});