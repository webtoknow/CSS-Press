import arrow from "./arrow.svg";
import doubleArrow from "./double-arrow.svg";
import { TutorialMachineStates } from "../../../machines/tutorialMachine";
import { TutorialMachineContext } from "../../../machines/TutorialMachineContext";
type Props = {
    actualState: string;
    hidePrevious?: boolean;
    hideNext?: boolean;
    showFinish?: boolean;
}

const DialogTutorial = ({ actualState, hideNext, hidePrevious, showFinish }: Props) => {
    const { send } = TutorialMachineContext.useActorRef();
    const state = TutorialMachineContext.useSelector((state) => state);
    const meta = state.getMeta() as Record<string, { message?: string } | undefined>;

    const btnsClass = `tutorial__btns${hidePrevious ? ' tutorial__btns--next' : ''}`
    return (
        <>
            <div className={`tutorial__overlay tutorial__overlay--${actualState}`}>
                {(actualState === TutorialMachineStates.write || actualState === TutorialMachineStates.complete) && <span className={`tutorial__spot-${actualState}`}></span>}
            </div>
            <article className={`tutorial__info tutorial__info--${actualState}`}>
                <img className={`tutorial__arrow tutorial__arrow--${actualState}`} src={arrow} alt="Bouncing arrow" />
                <p className="tutorial__text" dangerouslySetInnerHTML={{__html: meta[`${state.machine.id}.${actualState}`]?.message || ''}}>
                </p>
                {(!hidePrevious || !hideNext || showFinish) && <div className={btnsClass}>
                    {!hidePrevious && <button className='tutorial__button' type='button' onClick={() => send({ type: 'PREV' })}>
                        <img className='tutorial__double-arrow tutorial__double-arrow--reverse' src={doubleArrow} alt="Previous" />
                        Prev
                    </button>}
                    {!hideNext && <button className='tutorial__button' type='button' onClick={() => send({ type: 'NEXT' })}>
                        <img className='tutorial__double-arrow' src={doubleArrow} alt="Next" />
                        Next
                    </button>}

                    {showFinish && <button className='tutorial__button' type='button' onClick={() => send({ type: 'FINISHED' })}>
                        <img className='tutorial__double-arrow' src={doubleArrow} alt="Finish" />
                        Finish
                    </button>}
                </div>}
            </article>
        </>
    )
}

export default DialogTutorial

