import css from './SidebarNotes.module.css';
import Link from 'next/link';

export const SidebarNotes = () => {


  return (
    <ul className={css.menuList}>
    {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      <li className={css.menuItem}>
        <Link href={`url до сторінки за відповідним тегом`} className={css.menuLink}>
          Назва тегу
        </Link>
      </li>
    </ul>
  )
}

export default SidebarNotes;