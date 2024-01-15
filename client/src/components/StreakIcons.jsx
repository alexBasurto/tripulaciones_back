import { useSession } from '../context/SessionContext';

const StreakIcons = () => {
    const { session } = useSession();
    
    // useEffect(() => {
    //     if (session === null) return;
    // }, [session]);
    if (session === null) return null;
    if (session.lastWeekVotes === null) return null;
    if (session.lastWeekVotes.length < 5) return null;
    if (session.lastWeekVotes) {
        return (
            
                <div className="streak-icons">
                    {session.lastWeekVotes.slice(1).reverse().map((vote, index) => {
                        const day = Object.keys(vote)[0];
                        const value = vote[day];
                        return (
                            <div key={index} className="streak-icon">
                                {value === 1 ? <img src="icons/flameIcon.svg" alt="" /> : day}
                            </div>
                        )
                    }
                    )}
                    <div className='streak-icon today-streak-icon'>
                        <img src="icons/flameIcon.svg" alt="" />
                        </div> {/* voto de hoy */}
                </div>
        )
    }
}

export default StreakIcons;