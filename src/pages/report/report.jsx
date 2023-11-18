import "../../assets/styles/pages/report.sass"

import { Chart } from "react-google-charts";

import moment from 'moment'
import { jsPDF } from "jspdf";

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//components
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";

//Hooks
import { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

//Reducer
import {getAllServices} from "../../slices/servClientSlice"

const Report = () => { 
    const dispatch = useDispatch()
    const {services} = useSelector((state) => state.service)
    const userLocal = JSON.parse(localStorage.getItem("user"))
    const chart = useRef()

    useEffect(() => {
        dispatch(getAllServices(userLocal.idMestre))
    }, [dispatch, userLocal.idMestre])

    //Array com todos os serviços que ja estão com o valor recebido como true
    const valorRecebido = services.filter((service) => {
        return service.valorTotalRecebido
    })

    //Declaração do array com os valores do grafico
    const data = [
        ["Data", "Valor"]
    ];  

    //Pegar informações necessarias do array de valor recebido
    const arrayValores = valorRecebido.map((item) => {
        return [moment(item.updatedAt).format("DD/MM/YYYY"), item.valorTotal]
    })

    //Inserir as informações no array do grafico
    arrayValores.map((item) => {
        return data.push(item)
    }) 

    //Configurações do grafico
    const options = {
    colors: ["#d84200"],
    legend: { position: "none" }
    };

    //Salvar informações do grafico em pdf
    const salvarPdf = async () => {
        let doc = new jsPDF()
        let pageWidth = 8.5,
        lineHeight = 1.2,
        margin = 0.5,
        maxLineWidth = pageWidth - margin * 2,
        fontSize = 20,
        ptsPerInch = 72,
        oneLineHeight = (fontSize * lineHeight) / ptsPerInch,
        text = valorRecebido.map((item) => {
            return [`Serviço realizado no dia ${moment(item.updatedAt).format("DD/MM/YYYY")} no valor de ${item.valorTotal}, ${item.descricaoServico}\n`]
        })

        let textString = text.toString().replace(/,/g, "")
        textString.replace(/\n/g, "\n")

        doc = new jsPDF({
        unit: "in",
        lineHeight: lineHeight
        }).setProperties({ title: "Relatório de Serviços feitos" });

        let textLines = doc
        .setFont("Open Sans")
        .setFontSize(fontSize)
        .splitTextToSize(textString, maxLineWidth);

        doc.setTextColor(216, 66, 0);
        doc.setFont("Open Sans", "bold");
        doc.text("Relatório de Serviços feitos", margin + 10 * oneLineHeight, margin, "center");
        doc.setFont("Open Sans", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(textLines, margin, margin + 2 * oneLineHeight);
        doc.save('relatorios.pdf')
    }

    return (
        <>
            <div className="breadcrumbs">
                <Breadcrumbs/>
            </div>
            <div id="report">
                <Container>
                    <Row> 
                        <Col style={{height: "650px"}}>
                            <h1>Relatorios</h1>
                            {services.length === 0 && 
                                <p className="center">Nenhum valor informado ainda.</p>
                            }
                            <Chart
                                chartType="Bar"
                                width="100%"
                                height="400px"
                                data={data}
                                options={options}
                                controls={[
                                {
                                    controlEvents: [
                                    {
                                        eventName: "statechange",
                                        callback: ({ controlWrapper }) => {
                                        console.log("State changed to", controlWrapper?.getState());
                                        },
                                    },
                                    ],
                                    controlType: "CategoryFilter",
                                    options: {
                                    filterColumnIndex: 0,
                                    ui: {
                                        labelStacking: "vertical",
                                        label: "Selecione a data:",
                                        allowTyping: false,
                                        allowMultiple: false,
                                        caption: "Escolha um valor..."
                                    },
                                    },
                                },
                                ]}

                                ref={chart}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button onClick={salvarPdf} className="btn btn-pdf">Salvar em PDF</button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Report