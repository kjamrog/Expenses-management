package zti.expenses.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long>, UserUtils {

    @Query(value = "select id, username from users where username=:username")
    ApplicationUser findBasicByUsername(@Param("username") String username);

    ApplicationUser findByUsername(String username);
}