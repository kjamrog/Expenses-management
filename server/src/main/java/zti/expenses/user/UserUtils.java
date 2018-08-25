package zti.expenses.user;

import org.springframework.security.core.Authentication;

public interface UserUtils {
    public ApplicationUser findByAuth(Authentication auth);
}
