import React from 'react';
import style from './copyrightSection.module.scss';
import { labels } from '@/data/labels';


function CopyrightSection() {
    return (
        <div className={style.container}>
            <div className={style.copyright}>
                <h4>
                    {labels.copyrightLabel}
                </h4>
            </div>
        </div>
    )
}

export default CopyrightSection