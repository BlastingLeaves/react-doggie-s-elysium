import React from 'react';
import Layout from '../../components/Layout';
import data from "./data.json";

function Terms() {
    return (
        <div>
            <Layout>
                <div className="container-fluid container-min-max-width">
                    <h1>Termeni si Conditii</h1>
                    <div className="row">
                        {data.map((item,idx) => {
                            return (
                                <div key={idx} className="col-12 my-3">
                                    <h2>{item.title}</h2>
                                    <hr/>
                                    <h4>{item.description}</h4>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default Terms;