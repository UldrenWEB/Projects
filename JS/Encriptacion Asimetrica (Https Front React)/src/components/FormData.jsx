import React from 'react';
import myFetch from '../resources/fetch';
import { saveAs } from 'file-saver';
import {
    useState,
    useRef
} from 'react'
import '../styles/formData.css'
// import ModalBase from './Modal';

import ModalCustom from './ModelCustom';
import 'bootstrap/dist/css/bootstrap.min.css'

const FormDatas = ({ isLoading }) => {
    const [files, setFiles] = useState([]);
    const [textInput, setTextInput] = useState('');
    const [isModal, setIsModal] = useState({})

    const fileInputRef = useRef()

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFiles(files.map(file => file));
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const files = Array.from(e.dataTransfer.files);
        setFiles(files.map(file => file));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDownload = (filename, text) => {
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        saveAs(blob, filename);
    }

    const handleClickGenerate = async (e) => {

        isLoading(true)
        const response = await myFetch({
            url: '/generateKeys',
            method: 'GET',
        })
        isLoading(false)
        const { publicKey, privateKey } = response;
        console.log(publicKey, privateKey);

        if (!publicKey || !privateKey) {
            setIsModal({
                visible: true,
                title: 'PairKey Error ',
                data: 'El par de claves no se genero correctamente'
            })
            return false;
        }

        setIsModal({
            visible: true,
            title: 'Success',
            data: `Se han descargado correctamente los archivos`
        })
        // Aquí puedes definir el contenido de tus archivos
        const pkey = publicKey;
        const prkey = privateKey;

        // Descargar los archivos
        handleDownload('publicKey.pem', pkey);
        handleDownload('privateKey.pem', prkey);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear objeto FormData
        const formData = new FormData();

        if (files.length <= 1) {
            console.log('Has fallado, faltan archivos')
            setIsModal(
                {
                    visible: true,
                    title: 'File Error',
                    data: 'Debes seleccionar mas de dos archivos'
                }
            )
            return false;
        }

        files.forEach((file) => {
            // console.log(file)
            formData.append('files', file);
        });

        if (textInput) {
            // console.log('AQUI INPUT -> ', textInput);
            formData.append('privateKey', textInput);
        }

        try {

            isLoading(true)
            const data = await myFetch({
                url: '/fileProcessor',
                method: 'POST',
                body: formData
            })
            isLoading(false)

            // console.log(data)
            if (data.error || !data) {
                setIsModal({
                    visible: true,
                    title: 'Bad File Selected Error',
                    data: `Debes seleccionar un archivo valido para desencriptar ${data.error ?? ''}`
                })
                return false;
            }

            if (!data.name || !data.price) {
                return setIsModal({
                    visible: true,
                    title: 'PrivateKey Error',
                    data: 'Hubo un error al Desencriptar los datos con esa clave Privada, :('
                })
            }

            setIsModal({
                visible: true,
                winner: {
                    isWinner: true,
                    name: data.name,
                    price: data.price
                }
            })


            setFiles([]);
            setTextInput('');
        } catch (error) {
            console.log('Hubo un error al enviar los datos', error.message);
            return false;
        }
    };

    const handleFilePrivateKeyChange = (e) => {
        const file = e.target.files[0]

        // console.log(file)
        if (file && file.name.endsWith('.pem')) {
            setTextInput(file)
        } else {
            setIsModal({
                visible: true,
                title: 'PrivateKey Error',
                data: 'Debes seleccionar una llave privada, en el formato valido'
            })
        }
    }

    const handleClickAdjunt = (e) => {
        fileInputRef.current.click();
    }

    // if (isModal.visible) {
    //     // console.log('Se debe hacer visible el modal', isModal);
    //     return (<ModalCustom
    //         title={isModal.title}
    //         content={isModal.data}
    //         winner={isModal.winner}
    //         setIsModalVisible={setIsModal}
    //     />)
    // }

    return (
        <>
            {isModal.visible && <ModalCustom
                title={isModal.title}
                content={isModal.data}
                winner={isModal.winner}
                setIsModalVisible={setIsModal}
            />}
            <h2 style={{ color: 'whitesmoke', fontFamily: 'sans-serif' }}>Manejo de Criptografia</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className='container-input-file'
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        name='files'
                        type="file"
                        id="file-input"
                        className="file-input"
                        multiple
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-input" className={files.length > 0 ? 'hide' : 'file-label'}>
                        Arrastra y suelta archivos aquí o haz clic para seleccionar archivos
                    </label>

                    {files.length > 0 && (
                        <>
                            <label className="label-selected-files" htmlFor='file-input'> {`Se seleccionaron ${files.length} archivos:`}</label>
                            <div className="selected-files">

                                {files.map((file, index) => (
                                    <p className={"select-file"} key={index}>{file.name}</p>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className='container-btn'>
                    {textInput && <p className="text-input-p-key">Archivo seleccionado: <strong>{textInput.name}</strong></p>}
                    <button className='btn btn-add-key' type='button' onClick={handleClickAdjunt}>
                        Clave privada
                        <input
                            name='privateKey'
                            type="file"
                            accept=".pem"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFilePrivateKeyChange}
                        />
                    </button>
                    <button className="btn btn-add-input" type="button" onClick={handleClickGenerate}>
                        Par de Claves
                    </button>
                    <button className="btn btn-send" type="submit">Enviar</button>
                </div>
            </form>
        </>
    );
};

export default FormDatas